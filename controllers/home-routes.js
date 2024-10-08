const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
                    include: [
                        { model: User,
                            attributes: ['user_name'],
                        }
                    ],
                    attributes: ['subject', 'body', 'poster', 'createdAt',]
        });

        const posts = postData.map((post) =>
            post.get({ plain: true }) 
        );
        console.log(posts);
        res.render('homepage', {
            posts,
            userLoggedIn: req.session.userLoggedIn,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/dashboard', async (req, res) => {
    console.log('Checking session: ', req.session);
    console.log('Session userLoggedIn status: ', req.session.userLoggedIn);
    if (req.session.userLoggedIn) {
        try {
            const userId = req.session.user_id;
            const user = await User.findOne({
                where: { user_id:userId },
                attributes: ['user_name']
            });
            const userPostData = await Post.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: User,
                        attributes: ['user_name'],
                    }
                ]
            });
            userPosts = userPostData.map((post) =>
            post.get({ plain: true }) 
        );
            res.render('dashboard', {
                userPosts,
                userLoggedIn: req.session.userLoggedIn,
                user_name: user.user_name,
            });
        } catch (err) {
            console.error('Error retrieving posts.', err);
            res.status(500).json({ message: 'Error retrieving posts.' });
        }
    } else {
        console.log('Server attempted to load dashboard but failed. Redirect to login.');
        res.redirect('/login');
    }
});

module.exports = router;
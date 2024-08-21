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
    if (req.session.userLoggedIn) {
        try {
            const userId = req.session.user_id;
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
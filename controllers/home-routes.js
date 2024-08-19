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
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
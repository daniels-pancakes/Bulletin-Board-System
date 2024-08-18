const router = require('express').Router();
const { Board, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Post,
                    attributes: ['subject', 'body', 'poster', 'createdAt',]
                },
            ],
        });

        const posts = postData.map((post) =>
            post.get({ plain: true }) 
        );
        res.render('homepage', {
            posts,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
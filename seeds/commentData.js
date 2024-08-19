const { Comment } = require('../models');

const commentData = [
    {
        comment_id: 1,
        body: 'THIS',
        post_thread_id:1,
    },
    {
        comment_id: 2,
        body: 'LOLd',
        post_thread_id:1,
    },
    {
        comment_id: 3,
        body: 'EPIC',
        post_thread_id:1,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
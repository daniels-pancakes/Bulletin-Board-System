const { Comment } = require('../models');

const commentData = [
    {
        comment_id: 1,
        body: 'Welcome Denizens of the Cyber World to the BBS. Enjoy your stay. For a first topic of discussion please feel free to use this thread for introductions. Please abide by the rules or face the consequences.',
        post_thread_id:1,
    },
    {
        comment_id: 2,
        body: 'Welcome Denizens of the Cyber World to the BBS. Enjoy your stay. For a first topic of discussion please feel free to use this thread for introductions. Please abide by the rules or face the consequences.',
        post_thread_id:1,
    },
    {
        comment_id: 3,
        body: 'Welcome Denizens of the Cyber World to the BBS. Enjoy your stay. For a first topic of discussion please feel free to use this thread for introductions. Please abide by the rules or face the consequences.',
        post_thread_id:1,
    },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
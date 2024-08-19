const { Post } = require('../models');

const postData = [
    {
        post_id: 1,
        subject: 'Welcome. Please read.',
        body: 'Welcome Denizens of the Cyber World to the BBS. Enjoy your stay. For a first topic of discussion please feel free to use this thread for introductions. Please abide by the rules or face the consequences.',
        poster: 'TheBlackMold',
    },
    {
        post_id: 2,
        subject: 'this website is dumb.',
        body: 'i haet ittttttttt!!!!!!!11',
        poster: 'brad',
    },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
const { User } = require('../models');

const userData = [
    {
        user_id: 1,
        user_name: 'ObsidianSovereign',
        password: 'TheBlackMold',
    },
    {
        user_id: 2,
        user_name: 'this website is dumb.',
        password: 'brad',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
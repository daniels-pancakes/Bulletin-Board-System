const { User } = require('../models');

const userData = [
    {
        user_id: 1,
        user_name: 'ObsidianSovereign',
        password: '123456',
    },
    {
        user_id: 2,
        user_name: 'brad',
        password: '7891011',
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
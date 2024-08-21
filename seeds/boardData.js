const { Board } = require('../models');

const seedBoard = async () => {
    await Board.create({
        id: 1,
        name: 'GENERAL',
        description: 'General discussion board.'
    });
};

module.exports = seedBoard;
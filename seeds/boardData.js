const { Board } = require('../models');

const boardData = [
    {
        board_name: 'BBS',
    },
];

const seedBoard = () => Board.bulkCreate(boardData);

module.exports = seedBoard;
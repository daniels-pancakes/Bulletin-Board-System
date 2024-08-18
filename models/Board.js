const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Board extends Model {}

Board.init(
    {
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
});

module.exports = Board;
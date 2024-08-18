const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'user_id',
                },
        },
        board_src: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'board',
                key: 'board_id',
                },
        },
    },
        // Options
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;
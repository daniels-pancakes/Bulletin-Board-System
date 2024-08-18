const User = require('./User');
const Board = require('./Board');
const Post = require('./Post');
const Comment = require('./Comment');

Board.hasMany(Post, {
    foreignKey: 'board_id',
})

Post.belongsTo(Board, {
    foreignKey: 'board_id',
});

User.hasMany(Post, {
    foreignKey: 'user_id',
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Board, Post };
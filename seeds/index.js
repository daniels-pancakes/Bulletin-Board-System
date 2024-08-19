const sequelize = require('../config/connection');

const seedBoard = require('./boardData');
const seedComment = require('./commentData');
const seedPost = require('./postData');
const seedUser = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await seedBoard();
  await seedUser();
  await seedPost();
  await seedComment();


  process.exit(0);
};

seedDatabase();

const Sequelize = require('sequelize'); 
require('dotenv').config();

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL, {
    // Required adding below options to enable SSL
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST || 'localhost',
            dialect: 'postgres',
            port: process.env.DB_PORT || 5432,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                }
            },
        }
    );

    module.exports = sequelize;
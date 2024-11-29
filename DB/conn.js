import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    timezone: '+00:00', // Use UTC for all queries
    dialectOptions: {
        timezone: 'Z', // Force UTC for MySQL
    },
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL connected successfully');
    } catch (error) {
        console.error('Connection error:', error.message);
        process.exit(1);
    }
};

// Export sequelize for use in models
export default { connectDB, sequelize };

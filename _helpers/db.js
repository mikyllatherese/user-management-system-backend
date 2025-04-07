const { Sequelize } = require('sequelize');
require('dotenv').config();  // Ensure environment variables are loaded

module.exports = db = {};

initialize();

async function initialize() {
    // Retrieve database credentials from environment variables or config
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    // Create a Sequelize instance using environment variables for the connection
    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
    });

    // Define your models using Sequelize
    db.Account = require('../accounts/account.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);

    // Define relationships (associations)
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // Sync the models with the database, altering the schema if necessary
    try {
        await sequelize.sync({ alter: true });  // Alter will modify tables if needed
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }

    // Export the sequelize instance and models for use elsewhere in your app
    db.sequelize = sequelize;
}
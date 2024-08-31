const { Sequelize } = require('sequelize');

// Database connection
const sequelize = new Sequelize('student_loan_management', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

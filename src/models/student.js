const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Student = sequelize.define('Student', {
    roll_number: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    program_name: DataTypes.STRING,
    year_of_admission: DataTypes.INTEGER,
    password: DataTypes.STRING,
});

module.exports = Student;

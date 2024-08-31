const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Employee = sequelize.define('Employee', {
    employee_id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    dob: DataTypes.DATE,
});

module.exports = Employee;

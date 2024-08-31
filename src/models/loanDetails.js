const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Student = require('./student');

const LoanDetails = sequelize.define('LoanDetails', {
    loan_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rollNumber: {
        type: DataTypes.STRING,
        references: {
            model: Student,
            key: 'rollNumber',
        },
    },
    semester: DataTypes.STRING,
    amount_received: DataTypes.DECIMAL(10, 2),
    bank_reference_no: DataTypes.STRING,
    date_of_receipt: DataTypes.DATE,
    proof_document: DataTypes.BLOB,
    loan_received: DataTypes.BOOLEAN,
});

module.exports = LoanDetails;

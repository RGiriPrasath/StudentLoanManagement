const fs = require('fs');
const path = require('path');

// Load mock data
const dataPath = path.join(__dirname, '../mockData.json');
const mockData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Student login
// const studentLogin = (rollNumber, dob) => {
//   console.log('Received rollNumber:', rollNumber);
//   console.log('Received dob:', dob);
//     const student = mockData.students.find(student => student.rollNumber === rollNumber && student.dob === dob);
//     return student ? { success: true, student } : { success: false, message: 'Invalid credentials' };
//   };
const studentLogin = (rollNumber, dob) => {
  console.log('Received rollNumber:', rollNumber);
  console.log('Received dob:', dob);
  return new Promise((resolve, reject) => {
  const student = mockData.students.find(student => student.rollNumber === rollNumber && student.dob === dob);
  if (student) {
    resolve({ success: true, student });
  } else {
    resolve({ success: false, message: 'Invalid credentials' });
  }
});
};

const getStudentDetails = (rollNumber) => {
  console.log('Received rollNumber:', rollNumber);
  return new Promise((resolve, reject) => {
    const student = mockData.students.find(student => student.rollNumber === rollNumber);
    console.log('getStudentDetails -> Student data:', student);
    if (student) {
      resolve({ success: true, student });
    } else {
      resolve({ success: false, message: 'Student not found' });
    }
  });
};

// Update loan details
const updateLoanDetails = (data) => {
  console.log('Received data:', data);
  return new Promise((resolve, reject) => {
    console.log('data.rollNumber:', data.student.rollNumber);
    const student = mockData.students.find(student => student.rollNumber === data.student.rollNumber);

    if (!student) {
      console.log('Student not found');
      return resolve({ success: false, message: 'Student not found' });
    }

    // Find the loan index within the student's loans
    const loanIndex = student.loans.findIndex(loan => loan.loanId === data.student.loans[0].loanId);
    console.log('Found loan index:', loanIndex);

    if (loanIndex !== -1) {
      student.loans[loanIndex] = { ...student.loans[loanIndex], ...data.student.loans[0] };
      console.log(student.loans[loanIndex]);
      fs.writeFileSync(dataPath, JSON.stringify(mockData, null, 2));
      return resolve({ success: true, updatedLoan: student });
      //return student;
    } else {
      reject({ success: false, message: 'Loan not found' });
    }
    // const loanIndex = mockData.students.loans.findIndex(loan => loan.loanId === data.loanId);
    // console.log('Found loan index:', loanIndex);
    // if (loanIndex !== -1) {
    //   mockData.students.loans[loanIndex] = { ...mockData.students.loans[loanIndex], ...data };
    //   fs.writeFileSync(dataPath, JSON.stringify(mockData, null, 2));
    //   return { success: true, updatedLoan: mockData.students.loans[loanIndex] };
    // } else {
    //   return { success: false, message: 'Loan not found' };
    // }
  });
  };

module.exports = {
    studentLogin,
    getStudentDetails,
    updateLoanDetails
  };
  
  
/*const Student = require('../models/student');
const LoanDetails = require('../models/loanDetails');

// Student Login
exports.studentLogin = async (req, res) => {
    const { roll_number, dob } = req.body;
    const student = await Student.findOne({ where: { roll_number, password: dob } });
    if (student) {
        res.json({ name: student.name, department: student.department });
    } else {
        res.status(401).json({ message: 'Invalid credentials & login failed.' });
    }
};

// Update Loan Details
exports.updateLoanDetails = async (req, res) => {
    const { roll_number, semester, amount_received, bank_reference_no, date_of_receipt, proof_document } = req.body;
    try {
        const loan = await LoanDetails.create({
            roll_number,
            semester,
            amount_received,
            bank_reference_no,
            date_of_receipt,
            proof_document,
            loan_received: false,
        });
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update loan details.', error });
    }
};*/

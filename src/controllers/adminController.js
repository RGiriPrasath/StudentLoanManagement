const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Load mock data
const dataPath = path.join(__dirname, '../mockData.json');
const mockData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Admin login
const adminLogin = (employeeId, dob) => {
    console.log('Received EmployeeID:', employeeId);
    console.log('Received dob:', dob);
    return new Promise((resolve, reject) => {
        const admin = mockData.admins.find(admin => admin.employeeId === employeeId && admin.dob === dob);
        if (admin) {
          return resolve({ success: true, admin });
        } else {
          return reject({ success: false, message: 'Invalid credentials' });
        }
      });
    
    //return admin ? { success: true, admin } : { success: false, message: 'Invalid credentials' };
  };
  
  // Get all loan records
const getLoanRecords = () => {
    console.log('Controller -> getLaonReocrds');
    return new Promise((resolve, reject) => {
      const studentsDetails= [];
        const admins = mockData.admins;
        if (admins) {
          console.log('Admin data:', admins);
        // Flatten the students from all admins into a single array
        const students = admins.flatMap(admin => admin.students || []);
        console.log('Students data:', students);
        students.forEach(student  => {
          const { rollNumber, name } = student;
          console.log(`student Inside students ForEach: ${JSON.stringify(student)}`);
          // Assuming you want to take the first loan's status
          student.loans.forEach(loan => {
            const { loanId, semester, amount, status, amountReceived, bankReferenceNo, dateOfReceipt } = loan;
            console.log(`Roll Number: ${rollNumber}`);
            console.log(`Roll Number: ${name}`);
            console.log(`Semester: ${semester}`);
            console.log(`Loan ID: ${loanId}`);
            console.log(`Loan Amount: ${amount}`);
            console.log(`Loan Status: ${status}`);
            console.log(`Amount Received: ${amountReceived}`);
            console.log(`Bank Reference No: ${bankReferenceNo}`);
            console.log(`Date of Receipt: ${dateOfReceipt}`);
  
            // Create a loan data object
            const loanData = {
              rollNumber,
              name,
              loanId,
              semester,
              amount,
              status,
              amountReceived,
              bankReferenceNo,
              dateOfReceipt
            };
  
            // Push the loan data object into the selectedStudents array
            studentsDetails.push(loanData);
          });
        });
          return resolve({ success: true, studentsDetails });
        } else {
          return reject({ success: false, message: 'Invalid credentials' });
        }
      });
    
  };
  
  // Download Loan Data as Excel
  const downloadLoanData = async (req, res) => {
    console.log('Controller -> downloadLoanData');
try {
      // Logic to convert loan data to Excel and send response
      const loanData = [];

      // Extract loan data from students and admins
      mockData.admins.forEach(admin => {
        if (admin.students && admin.students.length > 0) {
          admin.students.forEach(student => {
            if (student.loans && student.loans.length > 0) {
              student.loans.forEach(loan => {
                loanData.push({
                  rollNumber: student.rollNumber,
                  name: student.name || 'N/A',
                  email: student.email || 'N/A',
                  loanId: loan.loanId,
                  semester: loan.semester || 'N/A',
                  amount: loan.amount,
                  status: loan.status,
                  amountReceived: loan.amountReceived || 0,
                  bankReferenceNo: loan.bankReferenceNo || 'N/A',
                  dateOfReceipt: loan.dateOfReceipt || 'N/A'
                });
              });
            }
          });
        }
      });

      // Check if loanData is empty
      if (loanData?.length > 0) {

      // Create a new workbook
      const workbook = xlsx.utils.book_new();

      // Convert loan data to a worksheet
      const worksheet = xlsx.utils.json_to_sheet(loanData);

      // Append the worksheet to the workbook
      xlsx.utils.book_append_sheet(workbook, worksheet, 'Loan Data');

      // Generate a buffer
      const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

      // Set response headers
      res.setHeader('Content-Disposition', 'attachment; filename=loan_data.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

      // Send the Excel file as a response
      res.send(excelBuffer);
        console.log('Loan data downloaded successfully.');
      }
      else {
        res.status(404).json({ success: false, message: 'No Loan Data Found' })
      }
    }
    catch (error) {
      console.error('Error downloading loan data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {
    adminLogin,
    getLoanRecords,
    downloadLoanData
  };
/*const LoanDetails = require('../models/loanDetails');
const Employee = require('../models/employee');

// Admin Login
exports.adminLogin = async (req, res) => {
    const { employee_id, dob } = req.body;
    const admin = await Employee.findOne({ where: { employee_id, dob } });
    if (admin) {
        res.json({ name: admin.name, department: admin.department });
    } else {
        res.status(401).json({ message: 'Invalid credentials & login failed.' });
    }
};

// View Student Loan Records
exports.viewLoanRecords = async (req, res) => {
    try {
        const loans = await LoanDetails.findAll();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve loan records.', error });
    }
};

// Toggle Loan Received Status
exports.toggleLoanReceived = async (req, res) => {
    const { loan_id, loan_received } = req.body;
    try {
        await LoanDetails.update({ loan_received }, { where: { loan_id } });
        res.json({ message: 'Loan status updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update loan status.', error });
    }
};

// Download Loan Data as Excel
exports.downloadLoanData = async (req, res) => {
    try {
        const loans = await LoanDetails.findAll();
        // Logic to convert loan data to Excel and send response
    } catch (error) {
        res.status(500).json({ message: 'Failed to download loan data.', error });
    }
};
*/
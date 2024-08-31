const express = require('express');
const studentController = require('../controllers/studentController');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Student Routes

router.post('/student/login', (req, res) => {
    console.log('Request body:', req.body);
    studentController.studentLogin(req.body.rollNumber, req.body.dob)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
router.get('/student/dashboard', (req, res) => {
  const rollNumber = req.query.rollNumber;
  console.log('Student DashBoard Request body:', rollNumber);
  studentController.getStudentDetails(rollNumber)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});
router.post('/student/update-loan', (req, res) => {
  console.log('Student DashBoard Request body ->update-loan:', req.body);
  studentController.updateLoanDetails(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


// Admin Routes

router.post('/admin/login', (req, res) => {
  console.log('Request body:', req.body);
  adminController.adminLogin(req.body.employeeId, req.body.dob)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/admin/loan-records', (req, res) => {
  console.log('Request body:', req.body);
  adminController.getLoanRecords()
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

router.get('/admin/download-loan-data', (req, res) => {
  console.log('Request body:', req.body);
  adminController.downloadLoanData(req, res)
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

module.exports = router;

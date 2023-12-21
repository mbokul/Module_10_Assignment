const express = require('express');
const router = express.Router();

const authVerificationMiddleware = require('../middlewares/authVerifyMiddleware');
const studentController = require('../controllers/studentController');
const workController = require('../controllers/workController');

// Student Management API's
router.post('/registration', studentController.studentRegistration);
router.get('/login', studentController.studentLogIn);
router.get('/details', authVerificationMiddleware, studentController.studentDetails);
router.post('/update', authVerificationMiddleware, studentController.studentUpdate);

// Student Recovery API's
router.post('/verify-recovery-mail', studentController.recoveryMailVerification);
router.post('/verify-recovery-otp', studentController.verifyRecoveryOTP);
router.post('/reset-password', studentController.resetPassword);

// Work Management API's
router.post('/create-work', authVerificationMiddleware, workController.createWork);
router.get('/list-work', authVerificationMiddleware, workController.listWork);
router.post('/update-work', authVerificationMiddleware, workController.updateWork);
router.post('/delete-work', authVerificationMiddleware, workController.deleteWork);

module.exports = router;

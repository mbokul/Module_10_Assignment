const studentModel = require('../models/studentModel');
const OTPModel = require('../models/OTPModel');

const jsonWebToken = require('jsonwebtoken');
const mailValidator = require('deep-email-validator');
const sendMail = require('../helpers/sendMail');

const studentRegistration = async (req, res) => {
   const reqBody = req.body;
   const email = reqBody.email;

   try {
      const emailExists = await studentModel.find({ email: email }).count();

      if (!emailExists) {
         const studentData = await studentModel.create(reqBody);
         res.status(200).json({ status: 'Student Created', data: studentData });
      } else {
         res.status(403).json({ status: 'Failed', message: 'Email already exists' });
      }
   } catch (err) {
      res.status(404).json({ status: 'error', message: err.message });
   }
};

const studentLogIn = async (req, res) => {
   const email = req.body.email;
   const password = req.body.password;

   try {
      const student = await studentModel.find({
         $and: [{ email: email, password: password }],
      });

      if (student.length) {
         const token = jsonWebToken.sign(
            {
               data: email,
            },
            'secretKey12345',
            { expiresIn: '6h' }
         );
         res.status(200).json({
            status: `Student ${student[0].firstName} is here`,
            data: 'Login Successfull',
            token: token,
         });
      } else {
         res.status(404).json({ status: 'error', message: 'Student not found!' });
      }
   } catch (err) {
      res.status(404).json({ status: 'error', message: err.message });
   }
};

const studentDetails = async (req, res) => {
   const email = req.headers.email;

   try {
      const studentDetails = await studentModel.find({ email: email });
      res.status(200).json({ status: 'Success', data: studentDetails });
   } catch (err) {
      res.status(404).json({ status: 'error', message: err });
   }
};

const studentUpdate = async (req, res) => {
   const reqBody = req.body;
   const email = req.headers.email;

   try {
      const result = await studentModel.find({ email: email }).updateOne(reqBody);
      res.status(200).json({ status: 'Updated successfully', data: result });
   } catch (err) {
      res.status(404).json({ status: 'Error', message: err });
   }
};

const recoveryMailVerification = async (req, res) => {
   const email = req.body.email;
   const otpCode = Math.floor(100000 + Math.random() * 900000);
   const mailText = `Your verification code is ${otpCode}`;
   const mailSubject = `Student Registry Recovery Mail Verification`;

   try {
      const recoveryMail = await studentModel.find({ email: email });
      const validMail = (await mailValidator.validate(email)).valid;
      const isValid = email && validMail;

      if (recoveryMail.length && isValid) {
         sendMail(email, mailText, mailSubject);

         const result = await OTPModel.create({ email: email, otp: otpCode });
         res.status(200).json({
            status: 'Verification code has been sent to your mail address',
            data: result,
            validMail: validMail,
         });
      } else {
         res.status(200).json({
            data: 'Invalid email address',
            validMail: validMail,
            message: 'This mail validator only validates Gmail, so please use only valid gmail',
         });
      }
   } catch (err) {
      res.status(404).json({ status: 'Error', message: err });
   }
};

const verifyRecoveryOTP = async (req, res) => {
   const email = req.body.email;
   const otp = req.body.otp;
   const verified = false;

   try {
      const isOTP = await OTPModel.find({ email: email, otp: otp, verified: verified });

      if (isOTP.length) {
         const verifiedOTP = await OTPModel.updateOne(
            { email: email, otp: otp, verified: verified },
            { verified: true }
         );

         res.status(200).json({ status: 'OK', data: verifiedOTP, message: 'OTP verified successfully' });
      } else {
         res.status(401).json({ status: 'Failed', data: 'Invalid OTP' });
      }
   } catch (err) {
      res.status(404).json({ status: 'Error', message: err });
   }
};

const resetPassword = async (req, res) => {
   const email = req.body.email;
   const otp = req.body.otp;
   const newPassword = req.body.password;

   try {
      const OTPVerified = await OTPModel.find({ email: email, otp: otp, verified: true }).count();

      if (OTPVerified) {
         const result = await studentModel.updateOne({ email: email }, { password: newPassword });
         res.status(200).json({ status: 'success', data: result, message: 'Password updated successfully' });
      } else {
         res.status(401).json({ status: 'Failed', data: 'OTP Verification Required!' });
      }
   } catch (err) {
      res.status(404).json({ status: 'Error', message: err });
   }
};

module.exports = {
   studentRegistration,
   studentLogIn,
   studentDetails,
   studentUpdate,
   recoveryMailVerification,
   verifyRecoveryOTP,
   resetPassword,
};

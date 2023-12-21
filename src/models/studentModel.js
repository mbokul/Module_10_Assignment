const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
   {
      firstName: { type: 'string', required: true },
      lastName: { type: 'string', required: true },
      email: { type: 'string', required: true },
      password: { type: 'string', required: true },
      mobile: { type: 'string', required: true },
      class: { type: 'string', required: true },
      roll: { type: 'string', required: true },
   },
   { timestamps: true }
);

const studentModel = mongoose.model('students', studentSchema);

module.exports = studentModel;

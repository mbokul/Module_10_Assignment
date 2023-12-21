const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
   title: { type: String, required: true },
   classNote: { type: String, required: true },
   description: { type: String, required: true },
   status: { type: String, required: true },
   email: { type: String, required: true },
});

const workModel = mongoose.model('Works', workSchema);

module.exports = workModel;

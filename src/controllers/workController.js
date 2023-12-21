const workModel = require('../models/workModel');
const ObjectId = require('mongodb').ObjectId;

const createWork = async (req, res) => {
   const reqBody = req.body;
   const email = req.headers.email;

   try {
      const result = await workModel.create({ ...reqBody, email: email });
      res.status(200).json({ status: 'success', data: result });
   } catch (err) {
      res.status(404).json({ status: 'error', message: 'sorry' });
   }
};

const listWork = async (req, res) => {
   const email = req.headers.email;

   try {
      const result = await workModel.find({ email: email });

      if (result.length > 0) {
         res.status(200).json({ status: 'success', data: result });
      } else {
         res.status(200).json({ status: 'empty', data: 'No work found' });
      }
   } catch (err) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
   }
};

const updateWork = async (req, res) => {
   const reqBody = req.body;
   const id = new ObjectId(req.body.id);
   const email = req.headers.email;

   try {
      const result = await workModel.find({ email: email, _id: id }).count();

      if (result) {
         const updatedWork = await workModel.find({ email: email, _id: id }).updateOne(reqBody);
         res.status(200).json({ status: 'success', data: updatedWork, message: 'Work Updated Successfully' });
      } else {
         res.status(200).json({ status: 'empty', data: 'No work found' });
      }
   } catch (err) {
      res.status(401).json({ status: 'error', message: 'Unauthorized' });
   }
};

const deleteWork = async (req, res) => {
   const id = req.body.id;
   const email = req.headers.email;

   try {
      const work = await workModel.find({ email: email, _id: id });

      if (work.length) {
         const deletedWork = await workModel.deleteOne({ email: email, _id: id });
         res.status(200).json({ status: 'success', data: { work, deletedWork }, message: 'Work Deleted Successfully' });
      } else {
         res.status(401).json({ status: 'error', message: 'Unauthorized' });
      }
   } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
   }
};

module.exports = { createWork, listWork, updateWork, deleteWork };

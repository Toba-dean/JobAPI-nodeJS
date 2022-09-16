const Job = require('../model/JobModel');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors')

const JobCtrl = {
  createJob: async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ job });
  },
  getJobs: async (req, res) => {
    res.status(200).json({ success: true, msg: "Getting all jobs." });
  },
  getJob: async (req, res) => {
    res.status(200).json({ success: true, msg: "Getting a single job." });
  },
  updateJob: async (req, res) => {
    res.status(200).json({ success: true, msg: "Updating a job." });
  },
  deleteJob: async (req, res) => {
    res.status(200).json({ success: true, msg: "Deleting a job." });
  }
}


module.exports = JobCtrl;
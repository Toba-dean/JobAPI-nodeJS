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
    const { userId } = req.user;
    const jobs = await Job.find({ createdBy: userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ success: true, jobs, count: jobs.length });
  },
  getJob: async (req, res) => {
    const { params: { id: jobId }, user: { userId } } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`No job with id(${jobId}) found.`);
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  },
  updateJob: async (req, res) => {
    const {
      params: { id: jobId },
      user: { userId },
      body: { company, position }
    } = req;
    if (company === '' && position === '') {
      throw new BadRequestError('This fields cannot be empty.');
    }

    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      throw new NotFoundError(`No job with id(${jobId}) found.`);
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  },
  deleteJob: async (req, res) => {
    const { params: { id: jobId }, user: { userId } } = req;

    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    res.status(StatusCodes.OK).json({ success: true });
  }
}


module.exports = JobCtrl;
const express = require('express');
const router = express.Router();

const JobCtrl = require('../controller/JobCtrl');
const { createJob, getJobs, getJob, updateJob, deleteJob } = JobCtrl;


router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);


module.exports = router;
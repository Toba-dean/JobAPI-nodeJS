const express = require('express');
const router = express.Router();

const JobCtrl = require('../controller/JobCtrl');
const { createJob, getJobs, getJob, updateJob, deleteJob } = JobCtrl;


router.route('/job').get(getJobs).post(createJob);
router.route('/job/:id').get(getJob).patch(updateJob).delete(deleteJob);


module.exports = router;
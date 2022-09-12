const JobCtrl = {
  createJob: async (req, res) => {
    res.status(200).json({ success: true, msg: "Just created a new job." });
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
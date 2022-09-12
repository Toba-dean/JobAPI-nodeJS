const UserCtrl = {
  register: async (req, res) => {
    res.status(200).json({ success: true, msg: "Just registered a user." });
  },
  login: async (req, res) => {
    res.status(200).json({ success: true, msg: "Just registered a user." });
  },
}


module.exports = UserCtrl;
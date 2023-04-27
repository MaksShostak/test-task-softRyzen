const { User } = require("../../models/userSchema");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { accessToken: "", refreshToken: "" });

  res.status(202).json({
    _id,
    message: "Logout success",
  });
};

module.exports = logout;

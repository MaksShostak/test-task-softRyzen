const bcrypt = require("bcryptjs");

const { User } = require("../../models/userSchema");

const { httpError, createTokens } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const { accessToken, refreshToken } = createTokens(payload);
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      userName: user.userName,
    },
  });
};

module.exports = login;

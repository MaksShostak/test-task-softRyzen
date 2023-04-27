const bcrypt = require("bcryptjs");

const { User } = require("../../models/userSchema");

const { httpError } = require("../../helpers");

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    email,
    password: hashPassword,
  });
  res.status(201).json({
    user: {
      name: newUser.userName,
      email: newUser.email,
    },
  });
};

module.exports = register;

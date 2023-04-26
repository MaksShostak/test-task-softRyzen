const bcrypt = require("bcryptjs");

const { User } = require("../../models/userSchema");

const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.userName,
    },
  });
};

module.exports = register;

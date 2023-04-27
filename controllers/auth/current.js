const current = async (req, res) => {
  const { userName, email, _id } = req.user;

  res.status(200).json({
    userName,
    email,
    _id,
  });
};

module.exports = current;

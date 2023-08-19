const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  // операція для кастомного повідомлення на фронтед
  const { email } = req.body;
  const user = await User.findOne({ email });
  
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};

const { User } = require("../models/user");

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const newUser = User.create(req.body);

  res.json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};

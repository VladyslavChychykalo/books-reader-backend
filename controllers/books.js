// const contacts = require("../models/contacts");
// const { ctrlWrapper, HttpError } = require("../helpers");

// const listContacts = async (_, res) => {
//   const result = await contacts.listContacts();
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

// const getContactById = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.getContactById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

// const addContact = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const { id } = res.params;
//   const result = await contacts.updateContact(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(200).json(result);
// };

// const removeContact = async (req, res) => {
//   const { id } = req.params;
//   const result = await contacts.removeContact(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "Delete success",
//     result,
//   });
//   // or status 204
// };

// module.exports = {
//   listContacts: ctrlWrapper(listContacts),
//   getContactById: ctrlWrapper(getContactById),
//   addContact: ctrlWrapper(addContact),
//   updateContact: ctrlWrapper(updateContact),
//   removeContact: ctrlWrapper(removeContact),
// };

const books = require("../models/books");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await books.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await books.getById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await books.add(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await books.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await books.deleteById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // res.status(204).send()
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};

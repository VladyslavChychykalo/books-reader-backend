const books = require("../models/books");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const getAll = async (_, res) => {
  const result = await books.getAll();
  if (!result) {
    throw HttpError(404, "Not found");
  }
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
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }

  const result = await books.add(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
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
  res.json({
    message: "Delete success",
    result,
  });
};

// cтарая версия до декоратора ctrlWrapper

// const deleteById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await books.deleteById(id);
//     if (!result) {
//       throw HttpError(404, "Not found");
//     }
//     res.json({
//       message: "Delete success",
//       result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};

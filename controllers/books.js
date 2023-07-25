// const books = require("../models/books");
const { Book } = require("../models/book");
const { HttpError, ctrlWrapper } = require("../helpers");

// const getAll = async (req, res) => {
//   const result = await books.getAll();
//   res.json(result);
// };

const getAll = async (_, res) => {
  const result = await Book.find();
  // поля які треба повертати
  // find({}, "title, author")

  // // поля які не треба повертати
  // find({}, "-createdAt, -updatedAt")
  res.json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await books.getById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const getById = async (req, res) => {
  const { id } = req.params;
  // шукає по будь-якому параметру
  // const result = await Book.findOne({ _id: id });

  // шукає тільки по id
  const result = await Book.findById(id);

  // треба додати middleware isValidId - перевірка, чи взагалі прийшов id
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const add = async (req, res) => {
//   const result = await books.add(req.body);
//   res.status(201).json(result);
// };

const add = async (req, res) => {
  const result = await Book.create(req.body);
  res.status(201).json(result);
};

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const result = await books.updateById(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  // {new: true} - передає оновлений обєкт, а не старий

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  // {new: true} - передає оновлений обєкт, а не старий

  // findByIdAndUpdate - оновлює лише ті поля, які були передані, тому updateFavorite та updateById однакові

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

// const deleteById = async (req, res) => {
//   const { id } = req.params;
//   const result = await books.deleteById(id);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   // res.status(204).send()
//   res.json({
//     message: "Delete success",
//   });
// };

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};

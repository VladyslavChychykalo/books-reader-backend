const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const booksPath = path.join(__dirname, "books.json");

const getAll = async () => {
  // ошибка поиска books потому что ишет там где вызывается функция, а функция вызывается на уровень выше, ну уровне выше нет books.json.
  // поэтому нужен не относительный путь, а абсолютный через __dirname
  // но лучше делать через библиотеку path (правильно высталяет /)

  //   путь к папке books __dirname

  //   const data = await fs.readFile(`${__dirname}/books.json`, "utf-8");
  const data = await fs.readFile(booksPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const bookId = String(id);
  const books = await getAll();
  const result = books.find((item) => item.id === bookId);
  return result || null;
};

const add = async (data) => {
  const books = await getAll();
  const newBook = { id: nanoid(), ...data };
  const newArr = [...books, newBook];
  //   null, 2 - в json сделать не одну строку а в столбик
  await fs.writeFile(booksPath, JSON.stringify(newArr, null, 2));
  return newBook;
};

const updateById = async (id, data) => {
  const books = await getAll();
  //   const updatedBook = { id, ...data };
  //   const newArr = books.map((item) => (item.id === id ? updatedBook : item));

  //   await fs.writeFile(booksPath, JSON.stringify(newArr, null, 2));
  //   return updatedBook;
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) return null;

  books[index] = { id, ...data };
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return books[index];
};

const deleteById = async (id) => {
  const books = await getAll();
  const index = books.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const [result] = books.splice(index, 1);

  await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
  return result;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};

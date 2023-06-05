const mongoose = require("mongoose");

const app = require("./app");

const DB_NAME = "books_reader";
const DB_PASSWORD = "NGZC9ZdWFgrAXrTo";

const DB_HOST = `mongodb+srv://Vlad:${DB_PASSWORD}@cluster0.uhxtfy6.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    // команда закрывает запущенные процессы
    process.exit(1);
  });

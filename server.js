const mongoose = require("mongoose");

const app = require("./app");

// const { DB_HOST } = require("./config");

const { DB_HOST, PORT = 3000 } = process.env;

// console.log(process.env)

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    // команда закрывает запущенные процессы
    process.exit(1);
  });

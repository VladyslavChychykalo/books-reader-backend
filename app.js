const express = require("express");
const cors = require("cors");

const booksRouter = require("./routers/api/books");

const app = express();

app.use(cors());
// есть ли в запросе body, смотрит какой тип Content Type
// если application.json, то с помощью JSON.parse превразает в объект
app.use(express.json());
app.use("/api/books", booksRouter);

// обрабка не вірного запроса
app.use(() => {
  res.status(404).json({ message: "Not found" });
});

// next(error)
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app
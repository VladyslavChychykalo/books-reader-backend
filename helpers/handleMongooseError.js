const handleMongooseError = (error, data, next) => {
  // 409 - помилка на унікальність
  // коли помилка на унікальність name - MongoServerError, code - 11000, в залежності від помилки name та code будуть різними.
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;

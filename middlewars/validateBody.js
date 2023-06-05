const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      // вызов next прерывает функцию как return
      // тут нет контекста try catch, поэтому throw не используем
      // вызывается обработчик ошибок
      next(HttpError(400, error.message));
    }

    // переход к следующей middleware или к финальной функции
    next();
  };

  return func;
};

module.exports = validateBody;

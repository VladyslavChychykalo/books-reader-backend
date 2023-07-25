const { Schema, model } = require("mongoose");
const Joi = require("joi");
// const bookSchema = new Schema({
//   title: String,
//   author: String,
// });

const { handleMongooseError } = require("../helpers");

const genreList = ["fantastic", "love"];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: genreList,
      required: true,
    },
    date: {
      type: String,
      // 16-10-2009
      match: dateRegexp,
    },
  },
  { versionKey: false, timestamps: true }
);

// versionKey - прибирає _v

// додавання middleware до схеми, щоб зробити правільні статуси, mangoose не додає статуси, це треба робити вручну

bookSchema.post("save", handleMongooseError);

// Joi - перевіряє тіло запиту, а mongoose schema те що ми зберігаємо в БД

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string()
    .valid(...genreList)
    .required(),
  date: Joi.string().pattern(dateRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Book = model("book", bookSchema);

module.exports = { Book, schemas };

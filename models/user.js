const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// якщо стоврити модель і кудись її імпортувати, mongoose автоматично створить коллекцію в mongodb

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegex,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { versionKey: false, timestamps: true }
);

// unique - перевірити унікальність

userSchema.post("save", handleMongooseError);

// Joi.string().email() - має в собі свій регулярний вираз але він може не збігатись з тим який в змінніц, тому краще використовувати pattern()
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  loginSchema,
  registerSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};

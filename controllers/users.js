const User = require("../models/user");

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

const BAD_REQUEST = 400;

class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "PageNotFoundError";
    this.statusCode = 404;
  }
}

const NOT_FOUND = 404;

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.statusCode = 500;
  }
}

const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      if (err.name === ServerError) {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      } else err.name === ServerError;
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.getUserById = (req, res) => {
  User.findOne({ userId: req.params.id })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === PageNotFoundError) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      } else err.name === ServerError;
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate({ _id: req.user._id }, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
      if (err.name === PageNotFoundError) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      } else err.name === ServerError;
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate({ _id: req.user._id }, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
      if (err.name === PageNotFoundError) {
        return res
          .status(NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      } else err.name === ServerError;
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

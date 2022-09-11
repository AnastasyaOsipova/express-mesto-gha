const User = require("../models/user");

const BAD_REQUEST = 400;

const NOT_FOUND = 404;

const SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (res.status(SERVER_ERROR)) {
        return res.send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (res.status(BAD_REQUEST)) {
        return res.send({ message: "Переданы некорректные данные" });
      } else {
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
      if (res.status(NOT_FOUND)) {
        return res.send({ message: "Пользователь не найден" });
      } else {
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
      if (res.status(BAD_REQUEST)) {
        return res.send({ message: "Переданы некорректные данные" });
      }
      if (res.status(NOT_FOUND)) {
        return res.send({ message: "Пользователь не найден" });
      } else {
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
      if (res.status(BAD_REQUEST)) {
        return res.send({ message: "Переданы некорректные данные" });
      }
      if (res.status(NOT_FOUND)) {
        return res.send({ message: "Пользователь не найден" });
      } else {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

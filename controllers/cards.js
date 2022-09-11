const Card = require("../models/card");

const BAD_REQUEST = 400;

const NOT_FOUND = 404;

const SERVER_ERROR = 500;

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      if (res.status(SERVER_ERROR)) {
        return res.send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (res.status(NOT_FOUND)) {
        return res.send({ message: "Карточка не найдена" });
      } else {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (res.status(NOT_FOUND)) {
        return res.send({ message: "Карточка не найдена" });
      } else {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (res.status(NOT_FOUND)) {
        return res.send({ message: "Карточка не найдена" });
      } else {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

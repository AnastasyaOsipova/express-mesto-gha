const Card = require("../models/card");

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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  console.log(owner);
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
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

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      if (err.name === ServerError) {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === PageNotFoundError) {
        return res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      } else err.name === ServerError;
      {
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
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
      if (err.name === PageNotFoundError) {
        return res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      } else err.name === ServerError;
      {
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
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === ValidationError) {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Переданы некорректные данные" });
      }
      if (err.name === PageNotFoundError) {
        return res.status(NOT_FOUND).send({ message: "Карточка не найдена" });
      } else err.name === ServerError;
      {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Произошла неизвестная ошибка" });
      }
    });
};

/* eslint-disable no-else-return */
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id.toString()) {
        card.remove();
        res.status(200).send({ data: card });
      } else {
        next(new ForbiddenError('Вы не можете удалить эту карточку'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Невалидный id'));
      }
      if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

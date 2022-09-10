const cardsRoutes = require("express").Router();

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cardsRoutes.post("/", createCard);

cardsRoutes.get("/", getCards);

cardsRoutes.delete("/:cardId", deleteCard);

cardsRoutes.put("/:cardId/likes", likeCard);

cardsRoutes.delete("/:cardId/likes", dislikeCard);

module.exports = cardsRoutes;

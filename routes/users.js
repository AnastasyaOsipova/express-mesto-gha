const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,

} = require('../controllers/users');

const { authRegex } = require('../utils.js/constants');

userRouter.get('/', getUsers);

userRouter.get('/me', getUserInfo);

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().hex().length(24),
  }),
}), getUserById);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(authRegex),
  }),
}), updateUserAvatar);

module.exports = userRouter;

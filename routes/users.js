const userRouter = require('express').Router();


const { createUser, getUsers, getUserById } = require('../controllers/users');


userRouter.post('/', createUser);

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

module.exports = userRouter;
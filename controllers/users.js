const User = require('../models/user');


module.exports.getUsers = (req, res) => {
    User.find({})
        .then(users => res.send({ data: users }))
        .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
    User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findOne({_id: req.params.id})
  .then((user)=> res.send(user))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}
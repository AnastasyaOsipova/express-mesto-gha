const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: String,
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: ObjectId,
    default: [],
  },
  likes: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
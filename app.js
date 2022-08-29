const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');

const {PORT = 3000} = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', userRoutes);

//app.use('/cards', require('./routes/cards'));

app.listen(PORT, () =>{
  console.log(`example app listening at http://localhost:${PORT}`);

})

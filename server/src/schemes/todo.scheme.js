const mongoose = require('mongoose');

const TodoScheme = mongoose.Schema({
  _id: String,
  task: String,
  completed: Boolean
});

module.exports = TodoScheme;

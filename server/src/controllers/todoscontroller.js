const { v4 } = require('uuid');
const TodoModel = require('../models/todo.model');

const todosController = {};

// Obtener todas las tareas
todosController.getAllTodos = async (req, res) => {
  try {
    const allTodos = await TodoModel.find();
    res.send(allTodos);
  } catch (err) {
    console.error(err);
  }
};

todosController.createTodos = async (req, res) => {
  try {
    const newTodo = new TodoModel({
      _id: v4(),
      task: req.body.task,
      completed: false
    });
    await newTodo.save();

    const allTodos = await TodoModel.find();
    res.send(allTodos);
  } catch (err) {
    console.error(err);
  }
};

todosController.updateTodos = async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.updateOne({ _id: id }, { $set: { ...req.body } });

    const allTodos = await TodoModel.find();
    res.send(allTodos);
  } catch (err) {}
};

todosController.deleteTodos = async (req, res) => {
  const { id } = req.params;
  try {
    await TodoModel.deleteOne({ _id: id });

    const allTodos = await TodoModel.find();
    res.send(allTodos);
  } catch (err) {}
};

module.exports = todosController;

const express = require('express');
const todosRoutes = express.Router();
const todosController = require('../controllers/todoscontroller');

todosRoutes.get('/', todosController.getAllTodos);
todosRoutes.post('/', todosController.createTodos);
todosRoutes.patch('/:id', todosController.updateTodos);
todosRoutes.delete('/:id', todosController.deleteTodos);

module.exports = todosRoutes;

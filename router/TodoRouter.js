const express = require('express');
const todoController = require('../controller/TodoController')

const Router = express.Router();

Router.route('/')
    .get(todoController.getAllTask)
    .post(todoController.getFilter, todoController.getAllTask);


Router.route('/:id')
    .patch(todoController.updateTask)
    .delete(todoController.deleteTask);

Router.route('/deleteAll').get(todoController.deleteAllTask);
Router.route('/add').post(todoController.addTask);
Router.route('/updateTask/:id').patch(todoController.updateTaskName);

module.exports = Router;
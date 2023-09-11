const { urlencoded } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const Router = require('./router/TodoRouter');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

const staticPath = path.join(__dirname, "public");
// console.log(staticPath);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(staticPath));
app.set('view engine', 'ejs');
// app.set('view', 'path'); 
//pth = public/views;

app.use('/', Router);

// Testing
// const todoController = require('./controller/TodoController');
// const Todo = require('./model/TodoModel');
// const mongoose = require('mongoose');

module.exports = app;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const dbString = process.env.DATABASE;
// const username = dbString.replace('<username>', process.env.USERNAME);
const Database = dbString.replace('<password>', process.env.PASSWORD);

mongoose.connect(Database).then(() => {
    console.log("Database Successfully Conceted With Atlas.");
}).catch((err) => {
    console.log(err);
});

const port = process.env.PORT || 3000;

// const Database = "mongodb://localhost:27017/todo";

// mongoose.connect(Database).then(() => {
//     console.log("Database Successfully Connceted.");
// }).catch((err) => {
//     console.log(err);
// });

// const port = 8000;
app.listen(port, (req, res) => {
    console.log(`Todo List Web App Is Listing on Port No. ${port}...`);
});
const mongooes = require('mongoose');
const { boolean } = require('webidl-conversions');

const todoSchema = new mongooes.Schema({
    Task: {
        type: String,
        unique: true,
        required: [true, "Task Can't Be Null."]
    },
    Completed: {
        type: Boolean,
        default: false
    },
    Created_Time: {
        type: Date,
        default: Date.now()
    }
});

const Todo = mongooes.model('Todo_Task', todoSchema);
module.exports = Todo;
const Todo = require('../model/TodoModel');
const NotTask = ["Please Add This Task Here 👇🏻 ", "There Is No( ❌ ) Same Task You Written In Database 🗃"];
const WelCome = ["Welcome To Todo Web Page ✌🏻", "Please Add( ➕ ) Your All Tasks 📑"];

exports.getFilter = async(req, res, next) => {
    try {
        var searchText = req.body.searchText;
        // console.log(searchText);
        var regexPattern = new RegExp(searchText, 'i');
        // console.log(regexPattern);
        var searchTodo = await Todo.find({ "Task": { $regex: regexPattern } });
        // console.log(searchTodo);
        req.dataProcessed = searchTodo;
        req.textGiven = searchText;
        next();
    } catch (err) {
        res.render('error', { errorCode: 404, errorMessage: err })
    }

};

exports.getAllTask = async(req, res) => {
    try {
        var searchText = req.textGiven;
        // console.log(searchText);
        var searchTodo = req.dataProcessed;
        // console.log(searchTodo);
        if (searchText) {
            var flag = true;
            var addOrNot = searchTodo.forEach(e => {
                if (e.Task.toUpperCase() == searchText.toUpperCase())
                    flag = false;
            });
            var btnvisible = (searchTodo.length == 0 || flag) ? true : false;

            res.status(200).render('index', { allTodo: searchTodo, textGiven: req.textGiven, message: NotTask, button: btnvisible });
        } else {
            const allTodo = await Todo.find();
            res.status(200).render('index', { allTodo: allTodo, textGiven: "", message: WelCome, button: false });
        }
    } catch (err) {
        res.render('error', { errorCode: 404, errorMessage: err });
    }
};

exports.addTask = async(req, res) => {

    try {

        const createTime = new Date().toISOString();
        const addProject = Object.assign({ "Task": req.body.newTask, "Completed": false, "Created_Time": createTime });
        // console.log(addProject);

        await Todo.create(addProject);

        res.redirect('/');
    } catch (err) {
        res.render('error', { errorCode: 404, errorMessage: err });
    }
};

exports.updateTask = async(req, res) => {

    try {
        const updateBefore = await Todo.findById(req.params.id);
        const newUpdate = updateBefore.Completed ? false : true;
        await Todo.findByIdAndUpdate(req.params.id, { Completed: newUpdate }, {
            new: true,
            runValidators: true
        });
        // console.log(updateTask);
        res.redirect('/');
    } catch (err) {
        res.render('error', { errorCode: 404, errorMessage: err });
    }
};

exports.updateTaskName = async(req, res) => {
    try {
        const newTaskName = req.body.updateTask;
        await Todo.findByIdAndUpdate(req.params.id, { Task: newTaskName }, {
            new: true,
            runValidators: true
        });
        res.redirect('/');
    } catch (error) {
        res.render('error', { errorCode: 404, errorMessage: err });
    }
}

exports.deleteTask = async(req, res) => {

    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.render('error', { errorCode: 404, errorMessage: err });
    }
};

exports.deleteAllTask = async(req, res) => {
    try {

        await Todo.deleteMany();

        res.redirect('/');

    } catch (error) {
        res.render('error', { errorCode: 404, errorMessage: err });
    }
}
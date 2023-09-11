// const throttle = (fun, waitingTime) => {
//     var timeOutHandler;
//     return function() {
//         var args = arguments;
//         if (timeOutHandler) return;
//         timeOutHandler = setTimeout(() => {
//             timeOutHandler = null;
//             fun.apply(null, args);
//         }, waitingTime);
//     }
// };


var inputTask = document.getElementById('addNewTask');
var searchText = document.getElementById('searchText');
var searchForm = document.getElementById('searchForm');

// Focus input at the last
var len = inputTask.value.length * 2;
inputTask.focus();
inputTask.setSelectionRange(len, len);

// debounce Function
const debounce = (func, delay) => {
    let debounceTimer
    return function() {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
};

// Filter All Task After Given Time By debounce
var filterTodos = debounce(() => {
    searchText.value = inputTask.value;
    console.log(searchText.value);
    searchForm.submit();
}, 300);


// Update Task Name 
var updateName = (todoName) => {
    // console.log(todoName);
    const inputUpdate = document.getElementById(`${todoName}`);
    // console.log(inputUpdate);
    let passNewName = prompt('Please Write New Name : ', todoName);
    inputUpdate.value = passNewName;
};
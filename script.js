// tasks are stored in localstorage
document.addEventListener("DOMContentLoaded", loadTasks);

const taskList = document.getElementById('taskList');

const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");

addTaskBtn.addEventListener("click", addTask);
// or use 'return' key for addTask thru handleEnterKey
taskInput.addEventListener('keydown', handleEnterKey);
// use event delegation to add event to ul instead of a lot of events on li
taskList.addEventListener("click", removeTask);

//* helper function *///
function addOneTaskToUL(task) {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button class="delete-btn">X</button>`;
    taskList.appendChild(li);
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function addNewTaskToStorage(task) {
    let tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleEnterKey(e) {
    //check if its enter key
    if (e.key === "Enter") {
        //add task
        addTask();
    }
    
}

// *** FUNCTIONS *** //

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    addOneTaskToUL(taskText);
    addNewTaskToStorage(taskText);
    taskInput.value = "";
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(task => {
        addOneTaskToUL(task);
    });
}

function removeTask(e) {
    if (e.target.classList.contains("delete-btn")) {
        const taskText = e.target.parentElement.firstChild.textContent.trim();
        e.target.parentElement.remove();
        removeTaskFromStorage(taskText);
     }
}
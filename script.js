// Get the task list element
const taskList = document.getElementById('task-list');

// Get the add task form element
const addTaskForm = document.getElementById('add-task-form');

// Get the task input element
const taskInput = document.getElementById('task-input');

// Get the add task button element
const addTaskBtn = document.getElementById('add-task-btn');

// Initialize an empty task list
let tasks = [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = task;
        taskList.appendChild(taskElement);
    });
}

// Function to add a new task
function addTask(task) {
    tasks.push(task);
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to edit a task
function editTask(index, newTask) {
    tasks[index] = newTask;
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener to the add task button
addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
    }
});

// Add event listener to the task list
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const index = Array.prototype.indexOf.call(taskList.children, e.target);
        const task = tasks[index];
        const newTask = prompt('Edit task:', task);
        if (newTask) {
            editTask(index, newTask);
        }
    }
});

// Add event listener to the task list for deletion
taskList.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'LI') {
        const index = Array.prototype.indexOf.call(taskList.children, e.target);
        deleteTask(index);
    }
});

// Load tasks from local storage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
}
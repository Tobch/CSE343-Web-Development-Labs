class Task {
    constructor(description) {
        this.id = Date.now().toString(); 
        this.description = description;
        this.completed = false;
    }
}


const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = [];


function renderTasks() {

    taskList.innerHTML = tasks.map(task => `
        <li class="${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <span class="task-text">${task.description}</span>
            <button class="delete-btn">Delete</button>
        </li>
    `).join('');
}


function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        const newTask = new Task(text);
        tasks.push(newTask);
        taskInput.value = ''; 
        renderTasks();
    }
}


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});


taskList.addEventListener('click', (e) => {

    const li = e.target.closest('li');
    if (!li) return; 
    
    const taskId = li.getAttribute('data-id');
    

    if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(task => task.id !== taskId); 
    } else {

        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
    }
    
    renderTasks();
});
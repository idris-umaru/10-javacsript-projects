//Javascript code for todo app
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearAllBtn =  document.getElementById('clearAllButton');
const taskCount = document.getElementById('taskCount');
let tasks = [];

//Function to add new task 
const addTask = ()=>{
    const taskText = taskInput.value.trim();
    if (taskText === ''){
        alert('Please enter a task!')
        return; //stop here if empty
    }
// create a task Object with text and completion status 
const task = {
    id: Date.now(),// use unique ID using timestamps 
    text: taskText,
    completed: false
};

// Add neww task To our arrsy 
tasks.push(task);
taskInput.value = '';

renderTasks();
updateStats();//Update The Display
}


//Function To Display All Task 
const renderTasks = () => {
    taskList.innerHTML = '';

    //check if there are no tasks 
    if (tasks.length === 0){
        taskList.innerHTML = `
                <div class="empty-state">
                    <span>📝</span>
                    <p>No tasks yet! Add one above.</p>
                </div>
            `;
        clearAllBtn.classList.add('hidden'); // hide clear button
         // stop here
         return;
    }


    clearAllBtn.classList.remove('hidden');

    tasks.forEach((task) => {
        //create a list item (li) element
        const li = document.createElement('li');
        li.innerHTML = `<div class="task-content">
                    <input 
                        type="checkbox" 
                        ${task.completed ? 'checked' : ''} 
                        onchange="toggleTask(${task.id})"
                    />
                    <span class="task-text ${task.completed ? 'completed' : ''}">
                        ${task.text}
                    </span>
                </div>
                <div class="task-buttons">
                    <button class="delete-btn" onclick="deleteTask(${task.id})">
                        Delete
                    </button>
                </div>`;
            
            // Add this task to the list on the page
            taskList.appendChild(li);
     });
};
 
// function for task completion

function toggleTask(taskId){
    //find the task in our array that matches this ID
    const task = tasks.find (t => t.id === taskId);

if(task){
    task.completed = !task.completed;
    renderTasks(); //Redraw the list
    updateStats();
}
}

function deleteTask(taskId) {
    // Filter out the task with this ID (keep all others)
    // This is like crossing out a task in your notebook
    tasks = tasks.filter(task => task.id !== taskId);
    
    // Redraw the list without the deleted task
    renderTasks();
    updateStats();
}

// ============================================
// STEP 7: FUNCTION TO CLEAR ALL TASKS
// ============================================
function clearAllTasks() {
    // Ask user to confirm (safety check)
    if (confirm('Are you sure you want to delete all tasks?')) {
        // Empty the array (like tearing out all pages from notebook)
        tasks = [];
        
        // Redraw the empty list
        renderTasks();
        updateStats();
    }
}

// ============================================
// STEP 8: FUNCTION TO UPDATE TASK COUNT
// ============================================
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    taskCount.textContent = `Total tasks: ${total} | Completed: ${completed}`;
}

// ============================================
// STEP 9: EVENT LISTENERS (Connect buttons to functions)
// ============================================
// When user clicks "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// When user presses Enter key in the input
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// When user clicks "Clear All" button
clearAllBtn.addEventListener('click', clearAllTasks);

// ============================================
// STEP 10: INITIALIZE THE APP
// ============================================
// Show empty state when page first loads
renderTasks();
updateStats();






   


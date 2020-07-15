//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function to load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  // DOM load event (load any saved tasks in the LS)
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event (done after creating the code for adding a task)
  taskList.addEventListener('click', removeTask);
  // Clear task event (created after writing code for remove task)
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks event
  filter.addEventListener('keyup', filterTasks);

}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node to append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element (for the x symbol)
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
     // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

  });
}


// Add Task
function addTask(e) {
 if(taskInput.value === '') {
   alert('Add a task');
 }

 //Create li element
 const li = document.createElement('li');
 // Add class
 li.className = 'collection-item';
 // Create text node to append to li
 li.appendChild(document.createTextNode(taskInput.value));
 // Create new link element (for the x symbol)
 const link = document.createElement('a');
 link.className = 'delete-item secondary-content';
 // Add icon html
 link.innerHTML = '<i class="fa fa-remove"></i>';
 // Append the link to li
 li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS (created after all other basic page events: add, remove, clear, filter tasks)
  storeTaskInLocalStorage(taskInput.value);//pass in the value of the text entered 
  // Create function under the "add task" function

  // Clear the input
  taskInput.value = '';

  e.preventDefault();
}  

// Store task to LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove Task (first finish add task, then put in remove event listener, then function)

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage //create a function for this below
      (e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {

  //check local storage and put into a variable (taken from store to LS code):
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
//loop over each of the tasks
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
//set local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear tasks (function added after setting up remove task, then create clear tasks event listener)
function clearTasks () {
  // could do: taskList.innerHTML = '':
  // Faster executed: 
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
  localStorage.clear();
}

// Clear tasks from LS
function clearTasksFromLocalStorage(){

}

// Filter tasks
function filterTasks (e) {
  const text = e.target.value.toLowerCase(); //make lower case

  //use querySelectorAll to return a node list.  by class will return a html collection that would have to be converted to an array in order to use forEach
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}
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
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event (done after creating the code for adding a task)
  taskList.addEventListener('click', removeTask);

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

  // Clear the input
  taskInput.value = '';

  e.preventDefault();
}  

// Remove Task (first finish add task, then put in remove event listener, then function)

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
  }
}
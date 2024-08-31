const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('textInput');
const taskList = document.getElementById('Tasklist');

loadTask();

function addTask() {
  const Task = taskInput.value.trim();

  if (Task) {
    createTaskElement(Task);
    taskInput.value = '';
    saveTask();
  } else {
    alert('Input the value')
  }
}

addButton.addEventListener('click', addTask);

function createTaskElement(Task) {
  const listItem = document.createElement('li');

  listItem.textContent = Task;

  const deleteButton = document.createElement('deleteButton');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'DeleteTask';
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  deleteButton.addEventListener('click', function() {
    taskList.removeChild(listItem);
    saveTask();
  });
}

function saveTask() {
  let Tasks = [];
  taskList.querySelectorAll('li').forEach(function(item) {
    Tasks.push(item.textContent.replace('Delete', '').trim());
  });
  localStorage.setItem('Tasks', JSON.stringify(Tasks))
}

function loadTask() {
  const Tasks = JSON.parse(localStorage.getItem('Tasks')) || [];
  Tasks.forEach(createTaskElement);
}
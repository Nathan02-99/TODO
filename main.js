const addButton = document.getElementById('btn');
const textbox = document.getElementById('textbox');
const taskList = document.getElementById('task-list');
const allButton = document.getElementById('btn-all');
const pendingButton = document.getElementById('btn-pending');
const completedButton = document.getElementById('btn-completed');

let filter = 'all';

addButton.addEventListener('click', addTask);
textbox.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

allButton.addEventListener('click', function() {
  filter = 'all';
  filterTasks();
});

pendingButton.addEventListener('click', function() {
  filter = 'pending';
  filterTasks();
});

completedButton.addEventListener('click', function() {
  filter = 'completed';
  filterTasks();
});

function addTask() {
  const taskText = textbox.value;
  if (taskText.trim() !== '') {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="bi bi-pen-fill"></i>';
    editButton.addEventListener('click', function() {
      taskItem.contentEditable = true;
      taskItem.focus();
    });

    taskItem.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
            event.preventDefault();
            taskItem.contentEditable = false;
          }
        });

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i>';
    deleteButton.addEventListener('click', function() {
      taskContainer.remove();
    });

    taskContainer.appendChild(checkbox);
    taskContainer.appendChild(taskItem);
    taskContainer.appendChild(editButton);
    taskContainer.appendChild(deleteButton);
    taskList.appendChild(taskContainer);
    textbox.value = '';

    filterTasks();
  }
}

function filterTasks() {
  const tasks = taskList.getElementsByClassName('task-container');
  for (let i = 0; i < tasks.length; i++) {
    const taskContainer = tasks[i];
    const checkbox = taskContainer.querySelector('input[type="checkbox"]');
    const taskItem = taskContainer.querySelector('li');

    if (filter === 'all') {
      taskContainer.style.display = 'flex';
    } else if (filter === 'pending') {
      if (checkbox.checked) {
        taskContainer.style.display = 'none';
      } else {
        taskContainer.style.display = 'flex';
      }
    } else if (filter === 'completed') {
      if (checkbox.checked) {
        taskContainer.style.display = 'flex';
        taskItem.style.textDecoration = 'line-through';
        taskItem.style.fontStyle = 'italic';
      } else {
        taskContainer.style.display = 'none';
      }
    } else {
      taskContainer.style.display = 'none';
    }
  }
}

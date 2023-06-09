// Task class represents a single task
class Task {
  constructor(name, completed = false) {
    this.name = name;
    this.completed = completed;
  }
}

// TaskManager class manages the collection of tasks
class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(name) {
    const task = new Task(name);
    this.tasks.push(task);
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  toggleTaskCompleted(index) {
    const task = this.tasks[index];
    if (task) {
      task.completed = !task.completed;
    }
  }

  getTasks() {
    return this.tasks;
  }
}

// Create a new instance of TaskManager
const taskManager = new TaskManager();

// Select the form element and add a submit event listener
document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the value entered in the task input field
  const taskInput = document.querySelector('#taskInput');
  const task = taskInput.value;

  // Add the task to the task manager
  taskManager.addTask(task);

  // Call a method to handle displaying the tasks
  displayTasks();

  // Reset the task input field
  taskInput.value = '';
});

// Function to display the tasks
function displayTasks() {
  // Get the element where the task list will be displayed
  const taskListElement = document.getElementById('taskList');

  // Clear any existing content
  taskListElement.innerHTML = '';

  // Iterate over the tasks array and generate HTML for each task
  taskManager.getTasks().forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.name;

    // Add 'completed' class if the task is marked as completed
    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.addEventListener('click', () => {
      taskManager.toggleTaskCompleted(index);
      displayTasks();
    });

    taskListElement.appendChild(taskElement);
  });
}

// Call the displayTasks function initially to show any existing tasks
displayTasks();

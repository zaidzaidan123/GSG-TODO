const readline = require('readline');

function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

const tasks = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark a task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('***************************');
  rl.question("What's your choice? ", handleMenuChoice);
}

function handleMenuChoice(choice) {
  console.log();
  switch (choice) {
    case '1':
      rl.question('Enter task description: ', (description) => {
        rl.question('Enter task due date: ', (dueDate) => {
          rl.question('Enter task priority: ', (priority) => {
            const task = new Task(description, dueDate, priority);
            tasks.push(task);
            console.log('Task added successfully!');
            console.log();
            displayMenu();
          });
        });
      });
      break;
    case '2':
      listTasks();
      break;
    case '3':
      listCompletedTasks();
      break;
    case '4':
      markTaskAsDone();
      break;
    case '5':
      deleteTask();
      break;
    case '6':
      sortTasksByDueDate();
      break;
    case '7':
      sortTasksByPriority();
      break;
    case '8':
      clearAllTasks();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      console.log();
      displayMenu();
      break;
  }
}

function listTasks() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
  } else {
    console.log('Tasks:');
    tasks.forEach((task, index) => {
      console.log(`${index + 1}) ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority}, Completed: ${task.completed ? 'Yes' : 'No'})`);
    });
  }
  console.log();
  displayMenu();
}

function listCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  if (completedTasks.length === 0) {
    console.log('No completed tasks found.');
  } else {
    console.log('Completed Tasks:');
    completedTasks.forEach((task, index) => {
      console.log(`${index + 1}) ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority})`);
    });
  }
  console.log();
  displayMenu();
}

function markTaskAsDone() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
    console.log();
    displayMenu();
  } else {
    listTasks();
    rl.question('Enter the task number to mark as done: ', (taskNumber) => {
      const index = parseInt(taskNumber) - 1;
      if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        console.log('Task marked as done.');
      } else {
        console.log('Invalid task number. Please try again.');
      }
      console.log();
      displayMenu();
    });
  }
}

function deleteTask() {
  if (tasks.length === 0) {
    console.log('No tasks found.');
    console.log();
    displayMenu();
  } else {
    listTasks();
    rl.question('Enter the task number to delete: ', (taskNumber) => {
      const index = parseInt(taskNumber) - 1;
      if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        console.log('Task deleted successfully.');
      } else {
        console.log('Invalid task number. Please try again.');
      }
      console.log();
      displayMenu();
    });
  }
}

function sortTasksByDueDate() {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  console.log('Tasks sorted by due date.');
  console.log();
  displayMenu();
}

function sortTasksByPriority() {
  tasks.sort((a, b) => a.priority - b.priority);
  console.log('Tasks sorted by priority.');
  console.log();
  displayMenu();
}

function clearAllTasks() {
  tasks.length = 0;
  console.log('All tasks cleared.');
  console.log();
  displayMenu();
}

displayMenu();

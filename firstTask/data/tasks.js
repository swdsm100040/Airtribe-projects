let tasks = [
  { id: 1, title: "task1", completed: false },
  { id: 2, title: "task2", completed: true },
  { id: 3, title: "task3", completed: false }
];

let currentId = 4;

function getNextId() {
  return currentId++;
}

module.exports = {
  tasks,
  getNextId
};
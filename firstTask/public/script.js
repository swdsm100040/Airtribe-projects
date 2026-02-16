const API_URL = "/api/tasks";

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}">
        ${task.title}
      </span>
      <button onclick="toggleTask(${task.id}, ${task.completed})">
        ${task.completed ? "Undo" : "Done"}
      </button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const errorMsg = document.getElementById("errorMsg");
  const value = input.value.trim();

  // Clear previous error
  errorMsg.textContent = "";

  // Empty check
  if (!value) {
    errorMsg.textContent = "Task title is required";
    return;
  }

  // Character validation
  const regex = /^[a-zA-Z0-9 ]+$/;
  if (!regex.test(value)) {
    errorMsg.textContent =
      "Only letters and numbers are allowed (no special characters)";
    return;
  }

  // API call
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: value,
      completed: false
    })
  });

  input.value = "";
  fetchTasks();
}


async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchTasks();
}

// Load tasks on page load
fetchTasks();

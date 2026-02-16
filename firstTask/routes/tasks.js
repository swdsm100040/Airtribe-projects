const express = require("express");
const router = express.Router();
const { tasks, getNextId } = require("../data/tasks");

// CREATE – POST /api/tasks
router.post("/", (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const regex = /^[a-zA-Z0-9 ]+$/;
  if (!regex.test(title)) {
    return res.status(400).json({
      error: "Only letters and numbers are allowed"
    });
  }

  const newTask = {
    id: getNextId(),
    title,
    completed: completed ?? false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// READ ALL – GET /api/tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// READ ONE – GET /api/tasks/:id
router.get("/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// UPDATE – PUT /api/tasks/:id
router.put("/:id", (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;

  res.json(task);
});

// DELETE – DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  res.status(204).send();
});

module.exports = router;

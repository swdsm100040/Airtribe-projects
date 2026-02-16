const express = require("express");
const path = require("path");
const taskRoutes = require("../routes/tasks");
const errorHandler = require("../middleware/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());

// Serve frontend UI
app.use(express.static(path.join(__dirname, "../public")));

// RESTful API routes
app.use("/api/tasks", taskRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

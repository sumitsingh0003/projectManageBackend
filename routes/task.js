const express = require("express");
const task = require("../controllers/task");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();



// router.use(authenticateUser);
// Create a new task
router.post("/create", authenticateUser, task.createTask);
router.delete("/delete-task/:taskId", authenticateUser, task.deleteTask);
router.put("/updated-task", authenticateUser, task.updateTask);
router.get("/single-task/:taskId", authenticateUser, task.getTaskById);
router.get("/all-task", authenticateUser, task.getAllTasks);

router.get("/shared-task/:shareableLink", task.shareTask);

module.exports = router;
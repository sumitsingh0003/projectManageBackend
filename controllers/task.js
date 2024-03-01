const Task = require("../models/task");

function generateShortLink() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 6;
  let shortLink = "";
  for (let i = 0; i < length; i++) {
    shortLink += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return shortLink;
}

const createTask = async (req, res) => {
  try {
    const { title, priority, checklist, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!priority) {
      return res.status(400).json({ error: "Priority is required" });
    }
    if (!checklist) {
      return res.status(400).json({ error: "Checklist is required" });
    }

    const shareableLink = generateShortLink();
    const newTask = await Task.create({
      userId: req.userId,
      title,
      priority,
      checklist,
      dueDate,
      shareableLink,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTask = async (req, res) => {
  // console.log( req.body)
  let updatedTask;
  try {
    const { _id, title, priority, checklist, dueDate, status } = req.body;
    if (!title || !priority || !checklist) {
      return res
        .status(400)
        .json({ error: "Title, priority, and checklist are required" });
    }

    if (_id) {
      updatedTask = await Task.findByIdAndUpdate(
        _id,
        {
          title,
          priority,
          checklist,
          dueDate,
          status,
        },
        { new: true }
      ); // { new: true } ensures that the updated task is returned
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
    } else {
      return res.status(400).json({ error: "_id is required to edit a task" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(404).json({ error: "task not found" });
  }
};

const getAllTasks = async (req, res) => {
  const userId = req.userId;
  try {
    const data = await Task.find({ userId });
    if (!data) {
      console.log("No data found");
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task retrieved successfully", data });
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(404).json({ error: "task not found" });
  }
};

const shareTask = async (req, res) => {
  try {
    const { shareableLink } = req.params;
    const sharedTask = await Task.findOne({ shareableLink });
    if (!sharedTask) {
      return res.status(404).json({ error: "Shared task not found" });
    }
    res.status(200).json(sharedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getAllTasks,
  shareTask,
};

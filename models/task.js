const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  checklist: [
    {
      item: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
     
    },
    { _id: false }
  ],
  dueDate: {
    type: Date,
  },
  shareableLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["backlog", "todo", "in_progress", "done"],
    default: "todo",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

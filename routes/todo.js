const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Create Todo
router.post("/", auth, async (req, res) => {
  const todo = new Todo({
    user: req.user.id,
    title: req.body.title,
  });

  await todo.save();
  res.json(todo);
});

// Get Todos
router.get("/", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

// Update Todo
router.put("/:id", auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ msg: "Not found" });

  todo.completed = req.body.completed;
  await todo.save();

  res.json(todo);
});

// Delete Todo
router.delete("/:id", auth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const todo = await Todo.create({ text: req.body.text, user: req.user });
  res.json(todo);
};

exports.toggleTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ message: "Todo deleted" });
};

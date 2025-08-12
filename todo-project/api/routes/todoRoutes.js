const express = require("express");
const { getTodos, addTodo, toggleTodo, deleteTodo } = require("../controllers/todoController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", auth, getTodos);
router.post("/", auth, addTodo);
router.put("/:id", auth, toggleTodo);
router.delete("/:id", auth, deleteTodo);

module.exports = router;

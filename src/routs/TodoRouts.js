const express = require("express");
const router = express.Router();
const controller = require("../controller/TodoController");

router.post("/todos", controller.createNewTodo);
router.get("/todos", controller.getAllTodos);
router.get("/todos/:id", controller.getSingleTodo);
router.put("/todos/:id", controller.updateTodo);
router.delete("/todos/:id", controller.deleteTodo);

module.exports = router;

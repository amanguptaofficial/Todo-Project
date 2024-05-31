const mongoose = require("mongoose");
// here i am  creating Schema of the document..
const todoSchema = new mongoose.Schema(
  {
    title: {
      //first key
      type: String,
      required: true,
      minLength: 10,
      maxLength: 50,
    },
    description: {
      // second key
      type: String,
      required: true,
      minLength: 10,
      maxLength: 200,
    },
    completed: {
      // third key
      type: Boolean,
      default: false,
    },
    isDeleted: {
      // fourth key
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema, "Todo");

module.exports = Todo;


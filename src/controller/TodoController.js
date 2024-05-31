const service = require("../service/TodoService");
//-------------------------CREATE TODO CONTROLLER-------------------------------------//
const createNewTodo = async (req, resp) => {
  try {
    const createdTodo = await service.creatingTodo(req.body);
    resp.send(createdTodo);
  } catch (error) {
    resp.send({ code: 1000, msg: "Error Occured", data: {} });
  }
};

//-------------------------RETRIEVE ALL TODOS CONTROLLER---------------------------//
const getAllTodos = async (req, res) => {
  try {
    const retriveAllData = await service.retrieveAllTodos();
    res.send(retriveAllData);
  } catch (error) {
    res.send({ code: 1000, msg: "Error Occured when we are retrieve all todos", data: {} });
  }
};

//-------------------------RETRIEVE SINGLE TODOS BY ID CONTROLLER---------------------------//

const getSingleTodo = async (req, res) => {
  try {
    const {id}  = req.params;
    const fetchSingleTodo = await service.retrieveSingleTodoById(id);
    res.send(fetchSingleTodo);
  } catch (error) {
    res.send({ code: 1000, msg: "Error Occures when fetching the todo", data: {},});
  }
};

//-----------------------------Update todo by ID-------------------------------------

const updateTodo = async (req, res) => {
  try {
    const {id} = req.params;
    const reqdata = req.body;

    console.log(id, reqdata);
   
    const updatedData = await service.updateTodoById(id, reqdata);
    console.log(updatedData);
    res.send(updatedData);
  } catch (error) {
    res.send({ code: 1000, msg: "error occured at updating data", data: {} });
  }
};

//-------------------------------------Delete Todo BY ID-----------------------------------

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.deleteTodo(id);
    res.send(data);
  } catch (error) {
    res.send({ code: 1000, msg: "error occured at deleting data", data: {} });
  }
};

module.exports = {
  createNewTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};

const todo = require("../Model/Todo");
const mongoose = require("mongoose");
const validation= require('../validator/validate') 
const { ObjectId } = mongoose.Types;

//-------------------------------------------This Service is for Todo Creation:--------------------------------------------
async function creatingTodo(data) {
  try {
    const {title,description,completed}=data;  
    if(!validation.isBodyEmpty(data)) return {code:400, msg:"Please provide me data for creation", data:{}};
    if(!validation.isValid(title)) return {code:400, msg:"Title must be Required",data:{}};
    if(!validation.isVerifyString(title)) return {code:400, msg:"Title can contains only character",data:{}}
    if(title.length<=10) return {code:400, msg:"Title length must be greater than 10",data:{}};
    if(title.length>=50) return {code:400,msg:"Tittle length must be less than 50",data:{}};
    data.title= data.title.trim().split(" ").filter((word)=>word).join(" ");
    if(!validation.isValid(description)) return{code:400,msg:"Description must be required",data:{}};
    if(!validation.isVerifyString(description)) return {code:400,msg:"description can contains only character",data:{}};
    if(description.length<=10) return {code:400,msg:"Description length must be greater that 10",data:{}};
    if(description.length>=200) return {code:400, msg:"Description length must be less than 200 character",data:{}};
    data.description= data.description.trim().split(" ").filter((word)=>word).join(" ");
    if(!validation.isValidOptional(completed)) return {code:400,msg:"completed field can take only true or false only ",data:{}};

    const insertedData = await todo.create(data);
    let insertdata = { code: 200, msg: "success", data: insertedData };
    return insertdata;
  } catch (error) {
    return { code: 400, msg: error, data: {} };
  }
}

//------------------------------------------------This Service for Retrieve All Todos---------------------------------

async function retrieveAllTodos() {
  try {
    const recievedAllData = await todo.find({ isDeleted: false });
    if (recievedAllData.length == 0) return { code: 400, msg: "No Any Todo Present" };
    let data = { code: 200, msg: "success", data: recievedAllData };
    return data;
  } catch (error) {
    return error;
  }
}

//----------------------------------------------Retrieving a single Todo by ID--------------------------------

async function retrieveSingleTodoById(id) {
  try {
    if(!validation.isValidObjectId(id)) return {code :400,msg: "Please Give me the Correct ObjectId",data:{}};
    const retrieveSingleData = await todo.findById({ _id: id }).then((data)=>data);
   if (!retrieveSingleData) return { code: 400, msg: "Todo is not present in database", data: {} };
   if(retrieveSingleData.isDeleted) return {code:400,msg:"This Todo is deleted you can not see",data:{}};
    const data = { code: 200, msg: "success", data: retrieveSingleData };
    return data;
  } catch (error) {
    return error;
  }
}

//-----------------------------------Updating a Todo by ID (PUT /todos/:id)---------------------------

async function updateTodoById(id, reqdata) {  
  try{
     if(!validation.isValidObjectId(id)) return {code:400, msg:"Please Input the Valid ID",data:{}};
     if(!validation.isBodyEmpty(reqdata)) return {code:400, msg:"please fill the data which you want to update",data:{}};
     const {title,description,completed,isDeleted}=reqdata
     if(title){
     if(!validation.isValid(title)) return{code:400,msg:"please give me the title value",data:{}};
     if(!validation.isVerifyString(title)) return {code:400,msg:"title can contain only the character",data:{}};
     reqdata.title= reqdata.title.trim().split(" ").filter((word)=>word).join(" "); 
     }
     if(description){
      if(!validation.isValid(description)) return {code:400,msg:"Please pass the valid description",data:{}};
      if(!validation.isVerifyString(description)) return {code:400,msg:"description can contain only the character",data:{}};
      reqdata.description= reqdata.description.trim().split(" ").filter((word)=>word).join(" ");
     }
      if(completed){
      if(!validation.isValidOptional(completed)) return {code:400,msg:"completed field can take only true or false value",data:{}}
      }
      if(isDeleted) return {code:400,msg:"You can not change the isDeletedValue", data:{}}
      
    const updatedData = await todo.findByIdAndUpdate({ _id: id }, reqdata,{new:true});
    const data = { code: 200, msg: "success", data: updatedData };
    return data;
  } catch (error) {
    return error;
  }

}

//-----------------------------------Deleting a Todo by ID (DELETE /todos/:id)-----------------------//

async function deleteTodo(id) {
  try {
    if (!id) return { code: 400, msg: "Please give me the id", data: {} };
    if (!ObjectId.isValid(id))
      return { code: 400, msg: "please enter correct id", data: {} };
    const founddata = await todo.findById(id).then((data) => data);
    if (!founddata) return { code: 400, msg: "No TODO present for delete", data: {} };
    if(founddata.isDeleted) return {code:400,msg:"Todo is Already Deleted please give the another ID",data:{}};
    founddata.isDeleted = true;
    const deletedData = await todo.updateOne({ _id: id }, founddata);
    const data = { code: 200, msg: "TODO is deleted Succesfully", data: {} };
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  creatingTodo,
  retrieveAllTodos,
  retrieveSingleTodoById,
  updateTodoById,
  deleteTodo,
};

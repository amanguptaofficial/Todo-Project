const express = require("express"); // we are import the express package
const mongoose = require("mongoose"); // we are import the mongoose package
const router = require("./src/routs/TodoRouts");// we are import the todoRouts file 
const app = express(); //here we are creating the instance of the express and storing the app variable by using this we can use all functionalities of express  for example routing middleware and serversetup

app.use(express.json()); // Express js automatically parse Json formated data from the request body into the java object and make it available in req.body

const PORT = 3000; // here we are giving the port number0

mongoose
  .connect(
    "mongodb+srv://amangupta:Opx0adQCbdyU0RpE@aman.id6td9f.mongodb.net/projectOne"
  ) // Here we are connect our mongoDB and this return a promise we are handling the promise by using then() If it resolved succes then then() executed
  .then(() => {
    console.log("MongoDB Connected Successfully...");
  });

app.use("/", router); //app.use is a middleware this line tells any request comes from the / then we forward into our routs file its helps to write clean code

app.listen(PORT, () => {
  console.log(`server started at Port No: ${PORT} \n http://localhost:${PORT}`);
});  // app is instace of express by using app.listen function used to start express.js server and make it listen for incoming requested for the specific port 
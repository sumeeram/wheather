const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path")

dotenv.config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB was connected Successfully");
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8070;

app.listen(PORT, () => {
  console.log(`Server is up and running port ${PORT}`);
});

app.use("/api/auth", require("./backend/routes/auth/auth"));

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*" , (req , res)=>{
      res.sendFile(path.join(__dirname , "frontend" , "build" , "index.html"));
  })
}else{
  app.get("/" , (req ,res)=>{
      res.send("Api Running");
  })
}

const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const bodyParser = require("body-parser");
const User = require("./model/user");

const Comment = require("./model/comment");
const blogRoutes = require("./routes/blogRoutes")

app.use(express.json());
app.set('view engine', 'ejs')

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));
  
// blog routes

app.use(blogRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
  console.log(`Server is running on ${PORT}`)
});

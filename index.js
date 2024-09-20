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


app.get("/", (request, response) => {
  response.render('index',{title: "Welcome to my blog"})
});
app.get("/about", (request, response) => {
  response.render("about")
})
app.get("/404", (request, response) => {
  response.render("404")
})
app.get("/create", (request, response) => {
  response.render("create")
})

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

app.post("/api/user/register", async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json(error.message);
  }
});

app.post("/api/user/login", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return response.status(500).json({ message: "User not found" });
    }
    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json(error.message);
  }
});
// blog routes

app.use(blogRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
  console.log(`Server is running on ${PORT}`)
});

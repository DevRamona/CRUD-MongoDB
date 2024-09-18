const fs = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const bodyParser = require("body-parser");
const User = require("./model/user");
const BlogPost = require("./model/blogPost");
const Comment = require("./model/comment");

app.use(express.json());
// app.set('View engines', 'ejs')
// app.render('index')
app.get("/", (request, response) => {
  console.log("Updated changes being applied");
  response.send("Hello world");
});

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
    const user = await User.findOne({ username,password });

    if (!user) {
      return response.status(500).json({ message: "User not found" });
    }
    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json(error.message);
  }
});

app.post("/api/blog-post", async(request, response) => {
    const{title,tag,content,author} = request.body
    console.log(request.query)
    try {
      const blogPost=new BlogPost({title,author, tag, content})
      console.log(request)
      await blogPost.save()
      response.status(200).json({blogPost})
    }catch(error) {
        response.status(500).json(error.message);
    }
}) 
app.get("/api/blog-post", async(request, response) => {
  const query = request.query
  BlogPost.find(query).then((posts) => response.status(200).json(posts))
  .catch((error) => {
    response.status(500).json(error.message)
  })
})
app.get("/api/blog-post/:id", async(request, response) => {
  const {id} = request.params
  BlogPost.findById(id).then((posts) => response.status(200).json(posts))
  .catch((error) => {
    response.status(500).json(error.message)
  })
  
})

app.put("/api/blog-post/:id", async(request, response) => {
  const {id} = request.params
  BlogPost.findByIdAndUpdate(id, request.body, {new:true, overwrite:true}).then((posts) => response.status(200).json(posts))
  .catch((error) => {
    response.status(500).json(error.message)
  })
  
})
app.patch("/api/blog-post/:id", async(request, response) => {
  const {id} = request.params
  await BlogPost.findByIdAndUpdate(id, request.body, {new:true}).then((posts) => response.status(200).json(posts))
  .catch((error) => {
    response.status(500).json(error.message)
  })
  
})

app.listen(3000, () => {
  console.log("Connected to localhost");
});

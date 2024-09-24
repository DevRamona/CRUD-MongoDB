const BlogPost = require("../../model/blogPost");



const postBlog = async (request, response) => {
    const { title, tag, content, author } = request.body;
    console.log(request.query);
    try {
      const blogPost = new BlogPost({ title, author, tag, content });
      console.log(request);
      await blogPost.save();
      response.status(200).json({ blogPost });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }
  const getBlog = async (request, response) => {
    try {
      const blogPosts = await BlogPost.find()
      response.render('blogPosts', {blogPosts})
    }catch(error) {
      response.status(500).json(error.message);
    }
  }
  const getBlogId = async (request, response) => {
    const { id } = request.params;
    BlogPost.findById(id)
      .then((posts) => response.status(200).json(posts))
      .catch((error) => {
        response.status(500).json(error.message);
      });
  }
  const putBlogPost = async(request, response) => {
    const { id } = request.params;
    BlogPost.findByIdAndUpdate(id, request.body, { new: true, overwrite: true })
      .then((posts) => response.status(200).json(posts))
      .catch((error) => {
        response.status(500).json(error.message);
      });
  }
  const patchBlogPost = async (request, response) => {
    const { id } = request.params;
    await BlogPost.findByIdAndUpdate(id, request.body, { new: true })
      .then((posts) => response.status(200).json(posts))
      .catch((error) => {
        response.status(500).json(error.message);
      });
  }

  const deleteBlogPost = async(request, response) => {
    const{id} = request.params;
    await BlogPost.findByIdAndDelete(id, request.body)
    .then((post) => response.status(200).json(post))
    .catch((error) => {
      response.status(500).json(error.message);
    })
  }
  module.exports = {
    postBlog,
    getBlog,
    getBlogId,
    putBlogPost,
    patchBlogPost,
    deleteBlogPost
    
  } 
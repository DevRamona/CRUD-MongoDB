const express = require("express")
const router = express.Router()
const {postBlog,
  getBlog,
  getBlogId,
  putBlogPost,
  patchBlogPost} = require("./controllers/blogControllers")

router.post("/api/blog-post",postBlog );
router.get("/blog-post",getBlog );
router.get("/api/blog-post/:id", getBlogId );

router.put("/api/blog-post/:id", putBlogPost );
router.patch("/api/blog-post/:id",patchBlogPost );

module.exports = router
const express = require("express")
const router = express.Router()
const {postBlog,
  getBlog,
  getBlogId,
  putBlogPost,
  patchBlogPost, deleteBlogPost} = require("./controllers/blogControllers")
const path = "/api/blog-post"
router.post(path, postBlog );
router.get("/blog-post",getBlog );
router.get(`${path}/id`, getBlogId );

router.put(`${path}/id`, putBlogPost );
router.patch(`${path}/id`,patchBlogPost );
router.delete(`${path}/id`,deleteBlogPost );


module.exports = router
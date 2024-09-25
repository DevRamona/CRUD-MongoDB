const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title:String,
    content: String,
    tag: [String],
    author: String,
    creationDate: {type:Date, default: Date.now}

})
module.exports= mongoose.model("BlogPost", blogSchema)


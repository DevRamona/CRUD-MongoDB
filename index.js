const fs = require("fs")
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL
const bodyParser = require('body-parser')

app.get('/', (request, response) => {
    console.log("Updated changes being applied")
    response.send("Hello world")
})
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log(error.message))
app.listen(3000, ()=> {
    console.log("Connected to localhost")
})
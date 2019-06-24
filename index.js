const express = require('express')
const http = require('http')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router.js')
const mongoose = require('mongoose')

// db setup
mongoose.connect("mongodb://localhost/auth", { useNewUrlParser: true });
 
const connection = mongoose.connection;
 
connection.on("connected", function() {
  console.log("connected to db");
});

// app
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app)

// server
const port = process.env.PORT || 3090;
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on ', port)
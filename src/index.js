// const express = require('express')
import express from 'express'
// const bodyParser = require('body-parser')
import bodyParser from 'body-parser'
// const route = require('./routes/routes.js')
import route from './routes/routes.js'
const app = express()
// const mongoose = require('mongoose')
import mongoose from 'mongoose'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://taabish:2AWiE5SYFXDH7l56@cluster0.3ygaxxf.mongodb.net/management?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb connected"))
.catch(err=>console.log(err))
app.use('/',route);

app.use('/uploads/flat',express.static('src/uploads/flat'))

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
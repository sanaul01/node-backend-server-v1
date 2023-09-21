const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// Midilware
app.use(express.json());
app.use(cors());

// routes 
const productRouter = require('./routes/product.router')

app.get('/', (req, res)=>{
    res.send("welcome to my server at node mongodb backend")
});

app.use('/api/v1/product', productRouter); 

module.exports = app;
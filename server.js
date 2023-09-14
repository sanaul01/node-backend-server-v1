const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const colors = require('colors')

const app = require('./app')

// Connection with mongoose
mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
    console.log(`database connected successfully`.red.bold)
})

const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`.yellow.bold)
});

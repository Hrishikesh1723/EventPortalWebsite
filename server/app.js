const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});

require('./db/connection');

app.use(express.json());

// const User = require('./moduls/userSchema');
app.use(require('./router/auth'));
app.use(require('./router/event'));
app.use(require('./router/admin'));
app.use(require('./router/email'));

const PORT = process.env.PORT;




// app.get(`/about`,(req,res) =>{
//     res.send(`Hello World!2`)
// })
app.get(`/contact`,(req,res) =>{
    res.send(`Hello World!3`)
})
app.get(`/login`,(req,res) =>{
    res.send(`Hello World!4`)
})

app.listen(PORT, ()=>{
    console.log(`server is runging on port no. ${PORT}`)
});
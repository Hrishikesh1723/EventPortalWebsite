const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});

require('./db/connection');

app.use(express.json());

// const User = require('./moduls/userSchema');
app.use(require('./router/auth'));

const PORT = process.env.PORT;

const middleware = (req,res,next) => {
    console.log(`hello middleware`);
    next();
};

app.get(`/`,(req,res) =>{
    res.send(`Hello World!`)
});
app.get(`/about`,middleware,(req,res) =>{
    res.send(`Hello World!2`)
})
app.get(`/contact`,(req,res) =>{
    res.send(`Hello World!3`)
})
app.get(`/login`,(req,res) =>{
    res.send(`Hello World!4`)
})

app.listen(PORT, ()=>{
    console.log(`server is runging on port no. ${PORT}`)
});
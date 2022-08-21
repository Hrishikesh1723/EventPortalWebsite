const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://hrishikesh17:devil.17@cluster0.vqdcxgo.mongodb.net/eventPortal?retryWrites=true&w=majority'

mongoose.connect(DB).then(() => {
    console.log(`connection successful!`);
}).catch((err) => console.log(`connection fail`));

const middleware = (req,res,next) => {
    console.log(`hello middleware`);
    next();
}

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

app.listen(3000, ()=>{
    console.log(`server is runging on port no. 3000`)
});
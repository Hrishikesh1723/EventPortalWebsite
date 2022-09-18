const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
var cors = require('cors')

app.use(cors())

app.use('/images',express.static('images'));

dotenv.config({path:'./config.env'});

require('./db/connection');

app.use(express.json());

app.use(require('./router/auth'));
app.use(require('./router/event'));
app.use(require('./router/admin'));
app.use(require('./router/email')); 
app.use(require('./router/events3'));
app.use(cookieParser());

const PORT = process.env.PORT; 


app.listen(PORT, ()=>{
    console.log(`server is runging on port no. ${PORT}`)
});
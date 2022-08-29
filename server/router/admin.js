const express = require('express');
const jwt = require('jsonwebtoken');
const router3 = express.Router();
const bcrypt = require('bcryptjs');

require('../db/connection');
const Admin = require("../moduls/adminSchema");



// registration 
router3.post('/addadmin', async (req,res) => {

    const { name,email, password } = req.body;

    if ( !name || !email || !password ){
        return res.status(422).json( {error: "Please enter full detail!"});
    }

    try{

        const admin = new Admin({ name,email, password });

        await admin.save();
    
        res.status(201).json({message: "admin added"}); 


    }catch(err){

        console.log(err);

    }
});

// login 
router3.post('/admin', async (req,res) => {
    let token
    try{
        const { email , password} = req.body;

        if(!email || !password){

            return res.status(400).json({error: " Please fill data!"});
        }

        const adminLogin = await Admin.findOne({email:email});

        

        if(adminLogin){

            const passwordMatch = await bcrypt.compare(password, adminLogin.password);

            token = await adminLogin.generateAuthToken();

            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            });

        if(!passwordMatch){

            res.status(400).json({message:"Invalid Credentials!"});

        }else{

            res.json({message: "Login Successfull!"});
        }
        }else{

            res.status(400).json({message:"Invalid Credentials!"});
        }
    }catch(err){

        console.log(err);

    }
});



module.exports = router3;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/connection');
const User = require("../moduls/userSchema");


// main page
router.get(`/`,(req,res) =>{
    res.send(`Hello World! xyz`);
});

// registration 
router.post('/register', async (req,res) => {

    const { name, email, password , cpassword } = req.body;

    if ( !name || !email || !password || !cpassword ){
        return res.status(422).json( {error: "Please enter full detail!"});
    }

    try{
        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(422).json({error: "Email Already exist"});
        }else if(password != cpassword){
            return res.status(400).json({error: " Password did not match"});
        }else{
            const user = new User({ name, email, password , cpassword });

            await user.save();
    
            res.status(201).json({message: "Resgistration successfull!"}); 
        }

    }catch(err){
        console.log(err);
    }
});

// login 
router.post('/login', async (req,res) => {
    try{
        const { email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: " Please fill data!"});
        }

        const userLogin = await User.findOne({email:email});

        

        if(userLogin){
            const passwordMatch = await bcrypt.compare(password, userLogin.password);
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
})



module.exports = router;
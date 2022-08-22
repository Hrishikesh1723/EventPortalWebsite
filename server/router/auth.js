const express = require('express');
const router = express.Router();

require('../db/connection');
const User = require("../moduls/userSchema");

router.get(`/`,(req,res) =>{
    res.send(`Hello World! xyz`);
});

router.post('/register', async (req,res) => {

    const { name, email, password , cpassword } = req.body;

    if ( !name || !email || !password || !cpassword ){
        return res.status(422).json( {error: "Please enter full detail!"});
    }

    try{
        const userExist = await User.findOne({email: email});

        if(userExist) {
            return res.status(422).json({error: "Email Already exist"});
        }

        const user = new User({ name, email, password , cpassword });

        await user.save();

        res.status(201).json({message: "Resgistration successfull!"})

    }catch(err){
        console.log(err);
    }
});

module.exports = router;
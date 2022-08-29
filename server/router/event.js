const express = require('express');
const router2 = express.Router();

require('../db/connection');
const Event = require("../moduls/eventSchema");

// Adding event
router2.post('/addevent', async (req,res) => {

    const { title, detail, date , time, venue } = req.body;

    if ( !title || !detail || !date || !time || !venue ){
        return res.status(422).json( {error: "Please enter full detail!"});
    }

    try{
        const event = new Event({ title, detail, date , time, venue });

        await event.save();
    
        res.status(201).json({message: "event added"}); 

    }catch(err){

        console.log(err);

    }
});

module.exports = router2;
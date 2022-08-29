const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    detail:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },
    time:{
        type: String,
        require: true
    },
    venue:{
        type: String,
        require: true
    }

});

const Event = mongoose.model('EVENT',eventSchema);

module.exports = Event;
const express = require('express')

const Event = require('./events2')

const router = express.Router()

router.post('/event', Event.createEvent)
router.put('/event/:id', Event.updateEvent)
router.delete('/event/:id', Event.deleteEvent)
router.get('/event/:id', Event.getEventById)
router.get('/events', Event.getEvents)
  
module.exports = router 
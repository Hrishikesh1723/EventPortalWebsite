require('dotenv').config()
const router = require('express').Router()
const path = require('path')
const nodemailer = require('nodemailer')


const transport = {
service:'gmail',
host:'smtp.gmail.com',
port: 465,
auth: {
    user: process.env.SMTP_TO_EMAIL,
    pass: process.env.SMTP_TO_PASSWORD,
},
tls: {
  // do not fail on invalid certs
  rejectUnauthorized: false,
},
}

const transporter = nodemailer.createTransport(transport)
    transporter.verify((error, success) => {
if (error) {
    //if error happened code ends here
    console.error(error)
} else {
    //this means success
    console.log('Ready to send mail!')
}
})

router.get('/email', (req, res, next) => {
    res.status(200).json({ msg: 'Working' })
})

router.post('/sendemail', (req, res, next) => {
    const mail = {
    from: process.env.SMTP_FROM_EMAIL,
    to: req.body.toemail,
    subject: req.body.subject,
    text: `
      from:
      ${req.body.name}


      message:
      ${req.body.message}`,
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail',
            })
        } else {
            res.json({
                status: 'success',
            })
        }
    })
})

router.use('/api', function (req, res) {
    res.set('Content-Type', 'application/json')
    res.send('{"message":"Hello from the custom server!"}')
})

module.exports = router
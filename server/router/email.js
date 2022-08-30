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



router.post('/sendemail', (req, res, next) => {
    const mail = {
    from: process.env.SMTP_FROM_EMAIL,
    to: req.body.toemail,
    subject: req.body.subject,
    text: `
      Dear ${req.body.uname},

      ${req.body.message}
      
      from:
      ${req.body.name}
      regards`,
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



module.exports = router
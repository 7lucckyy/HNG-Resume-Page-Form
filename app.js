require('dotenv').config()
const express = require('express')
const validator = require('validator')

const nodemailer = require('nodemailer')
const morgan = require('morgan')

const PORT = 3000

const app = express();

app.use(morgan())

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(express.static('public'))


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')

});

app.post('/contact', (req, res)=>{

  let {name, email, subject, message} = req.body

  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${email} ${subject}`,
        text: message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
      
        if(error){
            console.log(error);
            res.send('Error')
        }else{
            res.send('success')
        }
    })
})

app.listen(PORT)
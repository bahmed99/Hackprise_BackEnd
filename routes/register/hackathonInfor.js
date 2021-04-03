const express = require("express")
const app = express()
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const router = express.Router()
router.use(express.json());
const path = require('path');
const Register = require("../../models/registerHackathonInfor")
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmed.bahri99@gmail.com',
    pass: 'ahmed200'
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "views"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "views"),
  extName: ".handlebars",
};


transporter.use(
  "compile",
  hbs(handlebarOptions)
);

router.post('/register', (req, res) => {

  let data = req.body;

  Register.findOne({ email: data.email })
    .then((savedUser) => {
      if (!savedUser) {


        const participant = new Register({
          nom: data.nom,
          email: data.email,
          tel: data.tel,
          profession: data.profession,

          nom1: data.nom1,
          tel1: data.tel1,
          profession1: data.profession1,

          nom2: data.nom2,
          tel2: data.tel2,
          profession2: data.profession2,

          nom3: data.nom3,
          tel3: data.tel3,
          profession3: data.profession3,

          nom4: data.nom4,
          tel4: data.tel4,
          profession4: data.profession4,

          accord: data.accord
        })


        participant.save()
          .then(user => {
            res.status(201).send({ error: false, sent: true, msg: false })


            var mailOptions = {
              from: 'ahmed.bahri99@gmail.com',
              to: user.email,
              subject: 'Sending Email using Node.js',
              text: `Hi Smartherd, thank you for your nice Node.js tutorials.
                          I will donate 50$ for this course. Please send me payment options.`,
              template: 'hackathonInfor'
              , context: {
                name: 'Accime Esterling'
              }
            }

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });




          })
          .catch(err => {
            res.status(400).send({ error: true, sent: false, msg: false })
          })
      }
      else {
        res.status(400).send({ error: true, sent: false, msg: true })
      }

    })
    .catch(err => {
      res.status(400).send({ error: true, sent: false, msg: false })
    })
})

module.exports = router
const express = require("express")
const app = express()
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const router = express.Router()
router.use(express.json());
const path = require('path');
const Register = require("../../models/registerHackathonStb")
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ahmed.bahri99@gmail.com',
    pass: 'bahri.200'
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


  if (!isEmpty(data.email3) && !isEmpty(data.email2)) {

    console.log(data)

    Register.findOne({ $or: [{ email: data.email }, { email: data.email1 }, { email: data.email2 }, { email: data.email3 }, { email1: data.email1 }, { email1: data.email }, { email1: data.email2 }, { email1: data.email3 }, { email2: data.email2 }, { email2: data.email }, { email2: data.email1 }, { email2: data.email3 }, { email3: data.email3 }, { email3: data.email }, { email3: data.email2 }, { email3: data.email1 }] })
      .then((savedUser) => {

        if (!savedUser) {
          const participant = new Register({
            nom: data.nom,
            email: data.email,
            tel: data.tel,
            profession: data.profession,
            Etablissement: data.Etablissement,
            NomEquipe: data.NomEquipe,

            nom1: data.nom1,
            email1: data.email1,
            tel1: data.tel1,
            profession1: data.profession1,
            Etablissement1: data.Etablissement1,

            nom2: data.nom2,
            email2: data.email2,
            tel2: data.tel2,
            profession2: data.profession2,
            Etablissement2: data.Etablissement2,

            nom3: data.nom3,
            email3: data.email3,
            tel3: data.tel3,
            profession3: data.profession3,
            Etablissement3: data.Etablissement3,


          })


          participant.save()
            .then(user => {
              res.status(201).send({ error: false, sent: true, msg: false })


              var mailOptions = {
                from: 'ahmed.bahri99@gmail.com',
                to: `${user.email},${user.email1},${user.email2},${user.email3}`,
                subject: '[MAIL DE CONFIRMATION]',
                template: 'hackathonStb'
                , 
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


  }

  else if (!isEmpty(data.email2) && isEmpty(data.email3)) {

    Register.findOne({ $or: [{ email: data.email }, { email: data.email1 }, { email: data.email2 }, { email1: data.email1 }, { email1: data.email }, { email1: data.email2 }, { email2: data.email2 }, { email2: data.email }, { email2: data.email1 }] })
      .then((savedUser) => {

        if (!savedUser) {
          const participant = new Register({
            nom: data.nom,
            email: data.email,
            tel: data.tel,
            profession: data.profession,
            Etablissement: data.Etablissement,
            NomEquipe: data.NomEquipe,

            nom1: data.nom1,
            email1: data.email1,
            tel1: data.tel1,
            profession1: data.profession1,
            Etablissement1: data.Etablissement1,

            nom2: data.nom2,
            email2: data.email2,
            tel2: data.tel2,
            profession2: data.profession2,
            Etablissement2: data.Etablissement2,

          })


          participant.save()
            .then(user => {
              res.status(201).send({ error: false, sent: true, msg: false })


              var mailOptions = {
                from: 'ahmed.bahri99@gmail.com',
                to: `${user.email},${user.email1},${user.email2}`,
                subject: '[MAIL DE CONFIRMATION]',
                template: 'hackathonStb'
                , 
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
  }

  else {

    Register.findOne({ $or: [{ email: data.email }, { email: data.email1 }, { email1: data.email1 }, { email1: data.email }] })
      .then((savedUser) => {
        if (!savedUser) {
          const participant = new Register({
            nom: data.nom,
            email: data.email,
            tel: data.tel,
            profession: data.profession,
            Etablissement: data.Etablissement,
            NomEquipe: data.NomEquipe,

            nom1: data.nom1,
            email1: data.email1,
            tel1: data.tel1,
            profession1: data.profession1,
            Etablissement1: data.Etablissement1,
          })


          participant.save()
            .then(user => {
              res.status(201).send({ error: false, sent: true, msg: false })

              var mailOptions = {
                from: 'ahmed.bahri99@gmail.com',
                to: `${user.email},${user.email1}`,
                subject: '[MAIL DE CONFIRMATION]',
                template: 'hackathonStb'
                , 
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
  }
})


function isEmpty(str) {
  return (!str || str.length === 0);
}
module.exports = router
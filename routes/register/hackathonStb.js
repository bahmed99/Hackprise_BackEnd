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
                html: `<p>
                  <h2> Cher(e) Participant(e) ,</h2>
                </p >
                <p>Nous vous confirmons votre inscription au <strong>Hack'prise</strong> en sa 1ère édition au Hackathom de
                    <strong>STB</strong>.
                </p>
                <p> Nous vous rappelons également la tenue de l'évènement le <strong> 14 Juillet </strong> à <strong> l'Ecole
                        Nationnal des Sciences de l'Informatique au Campus Universitaire de la Mannouba </strong> à <strong> 08:00
                    </strong> du matin.</p>
                <p>Pour toute information supplémentaire , veuillez visitez la page de l'évènement <a></a> ou bien contactez
                    directement notre page <a href="https://www.facebook.com/ENSI.Junior.Entreprise/"> Facebook .</a></p>
                <p>Dans l'attente de vous compter parmi nous,veuillez accepter l'expression de nos salutations distinguées.</p>
            
                <div>
            
                    <img src="cid:eje" width="180px">
                    <img src="cid:stb" width="300px">
                </div>`,
                template: 'hackathonStb'
                ,
                attachments: [
                  {   // utf-8 string as an attachment
                    filename: 'stb.jpg',
                    path: __dirname + "/views/stb.jpg",
                    cid: "stb"
                  },
                  {
                    filename: 'eje.jpg',
                    path: __dirname + "/views/eje.png",
                    cid: "eje"
                  }
                ]
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
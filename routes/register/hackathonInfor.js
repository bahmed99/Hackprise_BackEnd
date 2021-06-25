const express = require("express")
const app = express()
var nodemailer = require('nodemailer');
const hbs = require('nodemailer-handlebars');
const fs = require('fs')
const router = express.Router()
router.use(express.json());

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './CV');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.NomEquipe + '-' + file.originalname);
        console.log(req.body.NomEquipe)
    }
});

const upload = multer({
  storage: storage,
})

const multipleUpload = upload.fields([{name:"file"},{name:"file1"}])



const path = require('path');
const Register = require("../../models/registerHackathonInfor")
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

router.post('/register', multipleUpload,(req, res) => {

  let data = req.body;
 
  if(!isEmpty(data.email1))

  {
 
    Register.findOne({$or : [{ email: data.email},{ email: data.email1},{email1:data.email1},{email1:data.email}]})
    .then((savedUser) => {
      
      if (!savedUser) {
        
        if(req.file){

          fs.renameSync(req.file.path, req.file.path.replace('undefined', req.body.accord + req.body.nom));

        }

        const participant = new Register({
          nom: data.nom,
          email: data.email,
          tel: data.tel,
          profession: data.profession,
          Etablissement: data.Etablissement,
          NomEquipe:data.NomEquipe,
          niveau:data.niveau,
          SelectEnLigne:data.SelectEnLigne,
          
          nom1: data.nom1,
          email1:data.email1,
          tel1: data.tel1,
          profession1: data.profession1,
          Etablissement1: data.Etablissement1,
          accord:data.accord,
          niveau1:data.niveau1
    
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
  
  
  }
  else {
    Register.findOne({$or : [{ email: data.email},{email1:data.email}]})
    .then((savedUser) => {
      
      if (!savedUser) {

        if(req.file){

          fs.renameSync(req.file.path, req.file.path.replace('undefined', req.body.accord + req.body.nom));
          console.log(req.file.path)
        }
        const participant = new Register({
          nom: data.nom,
          email: data.email,
          tel: data.tel,
          profession: data.profession,
          Etablissement: data.Etablissement,
          NomEquipe:data.NomEquipe,
          SelectEnLigne:data.SelectEnLigne,
          accord:data.accord,
          niveau:data.niveau
  
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
    }





})

function isEmpty(str) {
  return (!str || str.length === 0 );
}

module.exports = router
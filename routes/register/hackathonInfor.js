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
    cb(null, req.body.nom + '-' + file.originalname);
    
  }
});

const upload = multer({
  storage: storage,
})

const multipleUpload = upload.fields([{ name: "file" }, { name: "file1" }])



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



router.post('/register', multipleUpload, (req, res) => {

  let data = req.body;

  if (!isEmpty(data.email1)) {

    Register.findOne({ $or: [{ email: data.email }, { email: data.email1 }, { email1: data.email1 }, { email1: data.email }] })
      .then((savedUser) => {

        if (!savedUser) {
          
          if (req.files.file) {
          
            fs.renameSync(req.files.file[0].path, req.files.file[0].path.replace('undefined', req.body.nom));
         
          }
          if (req.files.file1) {
          
            fs.renameSync(req.files.file1[0].path, req.files.file1[0].path.replace('undefined', req.body.nom1));
         
          }

          const participant = new Register({
            nom: data.nom,
            email: data.email,
            tel: data.tel,
            profession: data.profession,
            Etablissement: data.Etablissement,
            NomEquipe: data.NomEquipe,
            niveau: data.niveau,
            SelectEnLigne: data.SelectEnLigne,

            nom1: data.nom1,
            email1: data.email1,
            tel1: data.tel1,
            profession1: data.profession1,
            Etablissement1: data.Etablissement1,
            accord: data.accord,
            niveau1: data.niveau1

          })


          participant.save()
            .then(user => {
              res.status(201).send({ error: false, sent: true, msg: false })


              var mailOptions = {
                from: 'ahmed.bahri99@gmail.com',
                to: `${user.email},${user.email1}`,
                subject: '[MAIL DE CONFIRMATION]',
                html: `<p>
                  < h2 > Cher(e) Participant(e) ,</h2>
                </p >
                <p>Nous vous confirmons votre inscription au <strong>Hack'prise</strong> en sa 1ère édition au Hackathom de
                    <strong>Infor</strong>.
                </p>
                <p> Nous vous rappelons également la tenue de l'évènement le <strong> 14 Juillet </strong> à <strong> l'Ecole
                        Nationnal des Sciences de l'Informatique au Campus Universitaire de la Mannouba </strong> à <strong> 08:00
                    </strong> du matin.</p>
                <p>Pour toute information supplémentaire , veuillez visitez la page de l'évènement <a></a> ou bien contactez
                    directement notre page <a href="https://www.facebook.com/ENSI.Junior.Entreprise/"> Facebook .</a></p>
                <p>Dans l'attente de vous compter parmi nous,veuillez accepter l'expresion de nos salutations distinguées.</p>
            
                <div>
            
                    <img src="cid:eje" width="180px">
                    <img src="cid:infor" width="300px">
                </div>`,
                template: 'hackathonInfor'
                ,
                attachments: [
                  {   // utf-8 string as an attachment
                    filename: 'infor.jpg',
                    path: __dirname + "/infor.jpg",
                    cid: "infor"
                  },
                  {
                    filename: 'eje.jpg',
                    path: __dirname + "/eje.png",
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
  else {
    Register.findOne({ $or: [{ email: data.email }, { email1: data.email }] })
      .then((savedUser) => {

        if (!savedUser) {
          
          if (req.files) {
            

            fs.renameSync(req.files.file[0].path, req.files.file[0].path.replace('undefined', req.body.nom));
         
          }
          const participant = new Register({
            nom: data.nom,
            email: data.email,
            tel: data.tel,
            profession: data.profession,
            Etablissement: data.Etablissement,
            NomEquipe: data.NomEquipe,
            SelectEnLigne: data.SelectEnLigne,
            accord: data.accord,
            niveau: data.niveau

          })

          console.log(__dirname)
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
                    <strong>Infor</strong>.
                </p>
                <p> Nous vous rappelons également la tenue de l'évènement le <strong> 14 Juillet </strong> à <strong> l'Ecole
                        National des Sciences de l'Informatique au Campus Universitaire de la Mannouba </strong> à <strong> 08:00
                    </strong> du matin.</p>
                <p>Pour toute information supplémentaire , veuillez visitez la page de <a href="https://www.facebook.com/events/457426795701123">l'évènement </a> ou bien contactez
                    directement notre page <a href="https://www.facebook.com/ENSI.Junior.Entreprise/"> Facebook.</a></p>
                <p>Dans l'attente de vous compter parmi nous,veuillez accepter l'expression de nos salutations distinguées.</p>
            
                <div>
            
                    <img src="cid:eje" width="180px">
                    <img src="cid:infor" width="300px">
                </div>`,
                template: 'hackathonInfor'
                ,
                attachments: [
                  {   // utf-8 string as an attachment
                    filename: 'infor.jpg',
                    path: __dirname + "/views/infor.jpg",
                    cid: "infor"
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
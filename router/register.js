const express = require("express")
const app = express()

const router = express.Router()
router.use(express.json());
const Register = require("../models/register")

router.post('/', (req, res) => {
    
//   !data.participant[0].nom2|| !data.participant[0].prenom2|| !data.participant[1].nom3|| !data.participant[1].prenom3|| !data.participant[0].email2 || !data.participant[1].email3
    let data = req.body;
    console.log(data)
    // if (!data.nom || !data.prenom || !data.email|| !data.tel|| data.participants.length>3 || data.participants.length<2 ) {
    //     res.status(400).json({ error: "you are missing some fields" })
    // }
console.log(data)
    
    Register.findOne({ email: data.email })
        .then((savedUser) => {
            if (!savedUser) {
               
            
            const participant = new Register({
                nom: data.nom ,  
                email:data.email,
                tel : data.tel , 
                profession:data.profession,

                nom1: data.nom1 ,  
                tel1 : data.tel1 , 
                profession1:data.profession1,

                nom2: data.nom2 ,  
                tel2 : data.tel2 , 
                profession2:data.profession2,

                nom3: data.nom3 ,  
                tel3 : data.tel3 , 
                profession3:data.profession3,

                nom4: data.nom4 ,  
                tel4 : data.tel4 , 
                profession4:data.profession4,
                
                accord:data.accord
            })
            
            console.log(participant)
         
            participant.save()
                .then(user => {
                    res.status(201).send({ error:false,sent:true,msg:false })
                })
                .catch(err => {
                    res.status(400).send({ error:true,sent:false,msg:false })
                })
            }
            else{
                res.status(400).send({ error:true,sent:false,msg:true })
              }

        })
        .catch(err => {
            res.status(400).send({ error:true,sent:false,msg:false })
        })
})

module.exports = router
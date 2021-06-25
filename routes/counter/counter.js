const express = require("express")
const app = express()


const router = express.Router()
router.use(express.json());
const Exposition = require("../../models/exposition")
const HackathonInfor = require("../../models/registerHackathonInfor")
const HackathonStb = require("../../models/registerHackathonStb")
const Event = require("../../models/registerEvent")

router.get('/', (req, res) => {
    
        HackathonInfor.countDocuments().then((count1) => {
            HackathonStb.countDocuments().then((count2) => {
                
                    res.send(JSON.stringify({ "infor": count1, "stb": count2 })  ) 
                
            });
        });
  
})






module.exports = router
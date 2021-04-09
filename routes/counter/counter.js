const express = require("express")
const app = express()


const router = express.Router()
router.use(express.json());
const Exposition = require("../../models/exposition")
const HackathonInfor = require("../../models/registerHackathonInfor")
const HackathonStb = require("../../models/registerHackathonStb")
const Event = require("../../models/registerEvent")

router.get('/', (req, res) => {
    Exposition.countDocuments().then((count1) => {
        HackathonInfor.countDocuments().then((count2) => {
            HackathonStb.countDocuments().then((count3) => {
                Event.countDocuments().then((count4) => {
                    res.send(JSON.stringify({ "countExposition": count1, "countHackathon": count2 + count3, "countEvent": count4 })  ) 
                });
            });
        });
    });
})






module.exports = router
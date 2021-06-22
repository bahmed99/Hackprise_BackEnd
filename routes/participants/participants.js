const express = require("express")
const app = express()

const router = express.Router()
router.use(express.json());
const HackathonInfor = require("../../models/registerHackathonInfor")
const HackathonStb = require("../../models/registerHackathonStb")

router.get("/Infor", (req, res) => {
    HackathonInfor.find().then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )

})

router.get("/Infor/Enligne", (req, res) => {
    HackathonInfor.find({ SelectEnLigne: "En ligne" }).then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )

})

router.get("/Infor/EnPresentiel", (req, res) => {
    HackathonInfor.find({ SelectEnLigne: "En Présentiel" }).then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )

})


router.get("/Stb", (req, res) => {

    HackathonStb.find().then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )
})

router.get("/Stb/:id", (req, res) => {
    const id = req.params.id;

    HackathonStb.findById(id).then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )
})

router.get("/Infor/:id", (req, res) => {
    const id = req.params.id;

    HackathonInfor.findById(id).then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )
})


router.put('/infor/:id', (req, res) => {
    const id = req.params.id;
    HackathonInfor.findByIdAndUpdate(id,
        { $set: { done: true } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "erreur" })
            }
            res.json(result)
        })
})



router.put('/stb/:id', (req, res) => {
    const id = req.params.id;
    HackathonStb.findByIdAndUpdate(id,
        { $set: { done: true } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "erreur" })
            }
            res.json(result)
        })
})

router.put('/infor/not/:id', (req, res) => {
    const id = req.params.id;
    HackathonInfor.findByIdAndUpdate(id,
        { $set: { done: false } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "erreur" })
            }
            res.json(result)
        })
})



router.put('/stb/not/:id', (req, res) => {
    const id = req.params.id;
    HackathonStb.findByIdAndUpdate(id,
        { $set: { done: false } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "erreur" })
            }
            res.json(result)
        })
})







module.exports = router
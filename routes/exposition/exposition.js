const express = require("express")
const app = express()


const router = express.Router()
router.use(express.json());
const Exposition = require("../../models/exposition")


router.get('/', (req, res) => {
    Exposition.find().then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => { console.log(err) }
    )
})




module.exports = router
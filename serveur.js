const express = require("express");

const app = express()

const morgan = require('morgan')

const cors = require('cors')

const port = process.env.PORT || 3001;

app.use(express.json())

app.use(cors())

app.use(morgan('tiny'))

app.use("/register", require("./router/register"))

const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://first:first@cluster.6keue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) =>
    console.log("connected to database"),
    app.listen(port, () => {
        console.log(`runinig on port ${port}`)
    }
    )
).catch(err => {
    console.log("error")
})

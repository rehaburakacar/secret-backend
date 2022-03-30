const { addSecret, getSecrets } = require("./Services/secrets.js")
const express = require('express')
const app = express()
const port = process.env.PORT || 3002
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//To prevent from CORS policy errors.
var corsList = ['http://localhost:3000', 'http://localhost:3001', 'https://secret-frontend-updated-enk025p8e-rehaburakacar.vercel.app/']
var corsOptions = {
    origin: function (origin, callback) {
        if (corsList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods:["get","post"]
}

//takes parameters from user and post
app.post('/secret',cors(corsOptions), async (req, res) => {
    const secretText = req.body.secret
    const expireafter = parseInt(req.body.expireafter)
    let operation
    await addSecret(secretText, expireafter).then((res) => {
        operation = res
    })
    res.sendStatus(operation)
})

//Getting unique secret which was saved before 
app.get('/secrets/:hash', async (req, res) => {
    let result;
    res.header('Access-Control-Allow-Origin', '*');
    await getSecrets(req.params.hash).then((res) => {
        result = res
    })
    if (result == "404") {
        res.json({
            description: "Secret not found",
            status: 404
        })
    } else {
        res.json({
            description: "successfull operation",
            status: 200,
            result
        })
    }
})
 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
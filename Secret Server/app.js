const { addSecret, getSecrets } = require("./Services/secrets.js")
const express = require('express')
const app = express()
const port = 3002
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var corsList = ['http://localhost:3000', 'http://localhost:3001']
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
app.post('/secret',cors(corsOptions), async (req, res) => {
    //if (!req.header('id') || !req.header('name')) {
    //    console.log("HATA!!!!!")
    //}
    console.log(req.body)
    const secretText = req.body.secret
    console.log("SECRET" + secretText)
    const expireafter = parseInt(req.body.expireafter)
    let operation
    await addSecret(secretText, expireafter).then((res) => {
        operation = res
    })
    console.log("operation" + operation)
    res.sendStatus(operation)
})

//app.get('/secrets', (req, res) => {
//    getSecret("4084d3aa012b5a1b8c44fadd0c3c6743")
//})

app.get('/secrets/:hash', async (req, res) => {
    let result;
    res.header('Access-Control-Allow-Origin', '*');
    await getSecrets(req.params.hash).then((res) => {
        result = res
    })
    console.log("RESULT", result)
    if (result == "404") {
        console.log("BULUNAMADI")
        res.json({
            description: "Secret not found",
            status: 404
        })
    } else {
        console.log("SUCCEED")
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
//console.log("deneme")
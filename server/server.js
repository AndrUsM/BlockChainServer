const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


app.use(bodyParser.text())
app.use(bodyParser.json())
app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200'
  }));

const httpServer = require('http').Server(app)
const axios = require('axios');
const fs = require('fs')

const deploy = require('../lib/deploy')

const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'

const dbname = 'hackathon'
const url = `mongodb://127.0.0.1/${dbname}`

const server = {}

//database
mongoose.connect(url,{ useNewUrlParser: true })
const BlockchainSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    object: {
        type: String,
        required: true
    }
})
const db = mongoose.model('db', BlockchainSchema)

app.get('/', (req, res) => {
    db.findOne({id: req.query.Key }, (err, data) => {
        console.log(data)
        res.json(data).end()
    })
})

app.post('/', (req, res) => {   
    deploy(JSON.stringify(req.body)).then( data => {
        db.insertMany({"id": data[1], "object": data[2]}, (err, doc) => {
            if( err) throw err
        })
        res.json(data).end()
    });
})

server.init = () => {
    httpServer.listen(PORT, HOSTNAME, () => {
        console.log(`http://${HOSTNAME}:${PORT}`)
    })
}
module.exports = server
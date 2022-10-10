const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    perMessageDeflate: false,
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
const mongoose = require('mongoose')
const path = require('path')

app.use(express.json())
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var dbUrl = 'mongodb+srv://ballinger5421:hBMNvSlhvUdURw50@kinda.kdaxo7g.mongodb.net/test'

mongoose.connect(dbUrl, (err) => {
    console.log('MongoDB connection', err)
})

const transactionRouter = require('./routes/transactions')
app.use('/transactions', transactionRouter)

const studentRouter = require('./routes/students')
app.use('/students', studentRouter)

const checkInRouter = require('./routes/check-ins')
app.use('/check-ins', checkInRouter)


var server = http.listen(process.env.PORT || '3000', () => {
    console.log('Server is listening on port', server.address().port)
})
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http, {
    perMessageDeflate: false,
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
var mongoose = require('mongoose')
const { parse } = require('path')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var dbUrl = 'mongodb+srv://ballinger5421:hBMNvSlhvUdURw50@kinda.kdaxo7g.mongodb.net/test'

var Transaction = mongoose.model('Transaction', {
    debits: Array,
    credits: Array,
    description: String
})

app.get('/transactions', (req, res) => {
    Transaction.find({}, (err, transactions) => {
        res.send(transactions)
    })
})

app.post('/transactions', (req, res) => {
    console.log(req.body)
    var transaction = new Transaction(req.body)
    transaction.save((err) => {
        if(err) {
            sendStatus(500)
        }
        io.emit('transactions', req.body)
        res.sendStatus(200)
    })
})

var Student = mongoose.model('Student', {
    name: String
})

app.get('/students', (req, res) => {
    Student.find({}, (err, students) => {
        res.send(students)
    })
})

var Checkin = mongoose.model('Check-in', {
    date: Date,
    student: Object,
    studentName: String,
    timeIn: Object,
    timeOut: Object
})

app.get('/check-ins', (req, res) => {
    Checkin.find({}, (err, checkins) => {
        res.send(checkins)
    })
})

app.post('/check-ins', (req, res) => {
    console.log(req.body)
    var checkin = new Checkin(req.body)
    checkin.save((err) => {
        if(err) {
            sendStatus(500)
        }
        io.emit('check-ins', req.body)
        res.sendStatus(200)
    })
})

io.on('connection', (socket) => {
    console.log('A user connected.')
})

mongoose.connect(dbUrl, (err) => {
    console.log('MongoDB connection', err)
})

var server = http.listen(process.env.PORT || '3000', () => {
    console.log('Server is listening on port', server.address().port)
})
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://ballinger5421:hBMNvSlhvUdURw50@kinda.kdaxo7g.mongodb.net/test'

var Transaction = mongoose.model('Transaction', {
    debitAccount: String,
    creditAccount: String,
    amount: Number,
    description: String,
    reference: String
})

app.get('/transactions', (req, res) => {
    Transaction.find({}, (err, transactions) => {
        res.send(transactions)
    })
})

app.post('/transactions', (req, res) => {
    console.log("post transaction")
    var transaction = new Transaction(req.body)
    transaction.save((err) => {
        if(err)
            sendStatus(500)
        io.emit('transaction', req.body)
        res.sendStatus(200)
    })
})

io.on('connection', (socket) => {
    console.log('A user connected.')
})

mongoose.connect(dbUrl, (err) => {
    console.log('MongoDB connection', err)
})

var server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})


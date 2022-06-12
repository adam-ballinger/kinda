var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://ballinger5421:5uwqs5YykHLLa3Tj@cluster0.2zzud.mongodb.net/?retryWrites=true&w=majority'

var Expense = mongoose.model('Expense', {
    expense: String,
    amount: Number
})

app.get('/expenses', (req, res) => {
    Expense.find({}, (err, expenses) => {
        res.send(expenses)
    })

})

app.post('/expenses', (req, res) => {
    var expense = new Expense(req.body)

    expense.save((err) => {
        if(err)
            sendStatus(500)
        io.emit('expense', req.body)
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


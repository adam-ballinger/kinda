var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var expenses = [
    {expense: 'Chicks', amount: 41.17},
    {expense: 'Feed', amount: 5.42}
]

app.get('/expenses', (req, res) => {
    res.send(expenses)
})

app.post('/expenses', (req, res) => {
    expenses.push(req.body)
    io.emit('expense', req.body)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('A user connected.')
})


var server = http.listen(3000, () => {
    console.log('Server is listening on port', server.address().port)
})


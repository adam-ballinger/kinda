const mongoose = require('mongoose')

const checkInSchema = new mongoose.Schema({
    student: {
        type: Object,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    timeIn: {
        type: Object,
        required: true
    },
    timeOut: {
        type: Object,
        required: false
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('CheckIn', checkInSchema)
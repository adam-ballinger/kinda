const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    debits: {
        type: Array,
        required: true
    },
    credits: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Transaction', transactionSchema)
const express = require('express')
const router = express.Router()
const Transaction = require('../models/transaction')

router.get('/', async(req, res) => {
    try {
        const transactions = await Transaction.find()
        res.json(transactions)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.post('/', async (req, res) => {
    const transaction = new Transaction({
        debits: req.body.debits,
        credits: req.body.credits,
        description: req.body.description
    })

    try {
        const save = await transaction.save()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        var transaction = await Transaction.findById(req.params.id)
        transaction.debits = req.body.debits
        transaction.credits = req.body.credits
        transaction.description = req.body.description
        const save = await transaction.save()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
        const save = await transaction.remove()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

module.exports = router
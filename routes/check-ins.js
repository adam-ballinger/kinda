const express = require('express')
const router = express.Router()
const CheckIn = require('../models/check-in')

router.get('/', async(req, res) => {
    try {
        const checkIns = await CheckIn.find()
        res.json(checkIns)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.get('/open', async(req, res) => {
    try {
        const checkIns = await CheckIn.find({"status": "Open"})
        res.json(checkIns)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.post('/', async (req, res) => {
    const checkIn = new CheckIn({
        student: req.body.student,
        studentName: req.body.studentName,
        timeIn: req.body.timeIn,
        status: req.body.status
    })

    try {
        const save = await checkIn.save()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        console.log(req.body)
        var checkIn = await CheckIn.findById(req.params.id)
        checkIn.timeOut = req.body.timeOut
        checkIn.status = req.body.status
        const save = await checkIn.save()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const checkIn = await CheckIn.findById(req.params.id)
        const save = await checkIn.remove()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

module.exports = router
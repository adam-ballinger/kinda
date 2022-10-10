const express = require('express')
const router = express.Router()
const Student = require('../models/student')

router.get('/', async(req, res) => {
    try {
        const students = await Student.find()
        res.json(students)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        res.json(student)
    } catch(err) {
        res.send('Error' + err)
    }

})

router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name
    })

    try {
        const save = await student.save()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        var student = await Student.findById(req.params.id)
        student.name = req.body.name
        const save = await student.save()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        const save = await student.remove()
        res.json(save)
    } catch(err) {
        res.send('Error' + err)
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')

router.get('/1', (req, res) => {
    res.send('TICKET')
})

router.get('/tickets', ticketController.getAllTickets)

module.exports = router
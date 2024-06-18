const express = require('express')
const router = express.Router()
const ticketController = require('../controllers/ticketController')

router.get('/1', (req, res) => {
    res.send('TICKET')
})

router.get('/tickets', ticketController.getAllTickets)
router.get('/ticket/:id', ticketController.getTicketById)
router.get('/ticketsUser/:id', ticketController.getTicketsByUserId)
router.post('/ticket', ticketController.createTicket)
router.delete('/ticket/:id', ticketController.deleteTicketById)
router.delete('/ticketsUser/:id', ticketController.deleteAllTicketsByUserId);

module.exports = router
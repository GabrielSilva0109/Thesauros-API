const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users', async (req, res) => {
    try {
        const users = await userController.getAllUsers()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router

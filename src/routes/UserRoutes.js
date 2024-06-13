const express = require('express')
const router = express.Router()
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controller/UserController')

router.get('/users', getUsers)
router.get('/user/:id', getUserById)
router.post('/user', createUser)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

module.exports = router
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('API DO USERS');
});

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
// router.post('/userCreate', userController.createUser);

module.exports = router
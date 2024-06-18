const db = require('../db')
// const bcrypt = require('bcrypt')
const argon2 = require('argon2')

//Get ALL Users
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users'
    db.query(query, (erro, results) => {
        if(erro){
            return res.status(500).json({error: erro.message})
        }
        res.status(200).json(results)
    })
}
//seikla

//Get User By ID
exports.getUserById = (req, res) => {
    const idUser = req.params.id
    const query = 'SELECT * FROM users WHERE `user_id` = ?;'
    db.query(query, [idUser], (erro, results) => {
        if(erro) {
            return res.status(500).json({erro: erro.message})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(results[0])
    })
}

// //Create User
// exports.createUser = (req, res) => {
//     const { name, password, address, balance, created_at } = req.body

//     if(!name || !address || !password){
//         return res.status(400).json({error: 'Required fields are missing'})
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10)

//     const query = "INSERT INTO users (name, password, address, balance, created_at) VALUES (?, ?, ?, ?, ?);"
//     db.query(query,[name, hashedPassword, address, balance, created_at], (erro, results) => {
//         if (error) {
//             return res.status(500).json({ error: erro.message })
//         }
//         res.status(201).json({ message: 'User created successfully' })
//     })
// }
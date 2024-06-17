const db = require('../db')
const bcrypt = require('bcrypt')

//Return ALL USERs for DB
const getUsers = (req, res) => {
    db.query("SELECT * FROM users;", (erro, results) => {
        if(erro) {
            return res.status(500).json({erro: erro.message})
        }
        res.status(200).json(results)
    })
}

//Return USER for ID
const getUserById = (req, res) => {
    const idUser = req.params.id
    db.query('SELECT * FROM users WHERE `id` = ?;', [id], (erro, results) => {
        if(erro) {
            return res.status(500).json({erro: erro.message})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(results[0])
    })
}

const createUser = (req, res) => {
    const { name, password, address, balance, created_at } = req.body

    if (!name || !address) {
        return res.status(400).json({ error: 'Required fields are missing' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    db.query(
        "INSERT INTO users (name, password, address, balance, created_at) VALUES (?, ?, ?, ?, ?);",
        [name, hashedPassword, address, balance, created_at],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message })
            }
            res.status(201).json({ message: 'User created successfully' })
        }
    )
}

// Update USER
const updateUser = (req, res) => {
    const idUser = req.params.id;
    const { name, address, balance } = req.body;

    if (!name || !address || !balance) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    db.query(
        'UPDATE users SET name = ?, address = ?, balance = ? WHERE id = ?;',
        [name, address, balance, idUser],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message })
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found' })
            }

            res.status(200).json({ message: 'User updated successfully' })
        }
    )
}

// Delete USER
const deleteUser = (req, res) => {
    const idUser = req.params.id;

    db.query('DELETE FROM users WHERE id = ?;', [idUser], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({ message: 'User deleted successfully' })
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}
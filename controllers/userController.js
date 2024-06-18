const db = require('../db')
const argon2 = require('argon2')

async function hashPassword(password) {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (err) {
        console.error('Erro ao gerar hash de senha:', err);
        throw err;
    }
}

async function verifyPassword(hashedPassword, plainPassword) {
    try {
        return await argon2.verify(hashedPassword, plainPassword);
    } catch (err) {
        console.error('Erro ao verificar senha:', err);
        throw err;
    }
}

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

// Create User
exports.createUser = async (req, res) => {
    const { name, password, email, address, balance, created_at } = req.body;

    if (!name || !address || !password || !email) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const hashedPassword = await hashPassword(password);
        const query = "INSERT INTO users (name, password, email, address, balance, created_at) VALUES (?, ?, ?, ?, ?, ?);"

        db.query(query, [name, hashedPassword, email, address, balance, created_at], (erro, results) => {
            if (erro) {
                return res.status(500).json({ error: erro.message })
            }
            res.status(201).json({ message: 'User created successfully' })
        })
    } catch (error) {
        console.error('Error to Create User!', error)
        res.status(500).json({ error: 'Failed to create User' })
    }
}

// Update User
exports.updateUser = async (req, res) => {
    const { user_id, name, password, balance } = req.body

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' })
    }

    const fieldsToUpdate = {}
    if (name) fieldsToUpdate.name = name
    if (password) fieldsToUpdate.password = password
    if (balance) fieldsToUpdate.balance = balance

    if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).json({ error: 'No fields to update' })
    }

    try {
        if (password) {
            fieldsToUpdate.password = await hashPassword(password)
        }

        let query = 'UPDATE users SET '
        const values = []
        for (const field in fieldsToUpdate) {
            query += `${field} = ?, `
            values.push(fieldsToUpdate[field]);
        }
        query = query.slice(0, -2)
        query += ' WHERE user_id = ?'
        values.push(user_id)

        db.query(query, values, (erro, results) => {
            if (erro) {
                return res.status(500).json({ error: erro.message })
            }
            res.status(200).json({ message: 'User updated successfully' })
        })
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({ error: 'Failed to update user' })
    }
}

// Delete User
exports.deleteUser = (req, res) => {
    const idUser = req.params.id

    if (!idUser) {
        return res.status(400).json({ error: 'User ID is required' })
    }

    const query = 'DELETE FROM users WHERE user_id = ?'

    db.query(query, [idUser], (erro, results) => {
        if (erro) {
            return res.status(500).json({ error: erro.message })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ message: 'User deleted successfully' })
    })
}

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        const query = "SELECT * FROM users WHERE email = ?"
        db.query(query, [email], async (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message })
            }

            if (results.length === 0) {
                return res.status(404).json({ error: 'User not found' })
            }

            const user = results[0]

            try {
                if (await argon2.verify(user.password, password)) {
                    // Senha válida
                    res.status(200).json({ message: 'Login successful' })
                } else {
                    // Senha inválida
                    res.status(401).json({ error: 'Invalid password' })
                }
            } catch (err) {
                console.error('Error verifying password:', err)
                res.status(500).json({ error: 'Failed to verify password' })
            }
        })

    } catch (error) {
        console.error('Error logging in user:', error)
        res.status(500).json({ error: 'Failed to login user' })
    }
}
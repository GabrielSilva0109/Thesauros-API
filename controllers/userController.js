const db = require('../db')

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
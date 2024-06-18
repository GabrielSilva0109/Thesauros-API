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
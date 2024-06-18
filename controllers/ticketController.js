const db = require('../db')

exports.getAllTickets = (req, res) => {
    const query = "SELECT * FROM tickets"
    db.query(query, (erro, results) => {
        if(erro){
            return res.status(500).json({error: erro.message})
        }
        res.status(200).json(results)
    })
}
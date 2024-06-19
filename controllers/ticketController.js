const db = require('../db')

function generateRandomLetters(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

function generateRandomNumber(length) {
    const digits = '0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    return result;
}

exports.getAllTickets = (req, res) => {
    const query = "SELECT * FROM tickets"
    db.query(query, (erro, results) => {
        if(erro){
            return res.status(500).json({error: erro.message})
        }
        res.status(200).json(results)
    })
}

exports.getTicketById = (req, res) => {
    const idTicket = req.params.id
    const query = "SELECT * FROM tickets WHERE `ticket_id` = ?"
    db.query(query, [idTicket], (erro, results) => {
        if(erro) {
            return res.status(500).json({erro: erro.message})
        }
        if (results.length === 0) {
            return res.status(404).json({ error: ' not found' })
        }
        res.status(200).json(results[0])
    })
}

exports.getTicketsByUserId = (req, res) => {
    const userId = req.params.userId;

    const query = "SELECT * FROM tickets WHERE user_id = ?";
    db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json(results);
    });
}

//Create Tickets
exports.createTicket = async (req, res) => {
    const { user_id, ticket_cost } = req.body;

    if (!user_id || !ticket_cost) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        // Verifica se o usuário existe
        const [user] = await db.promise().query('SELECT * FROM users WHERE user_id = ?', [user_id]);

        if (!user.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Gera o número do ticket
        const ticket_number = generateRandomLetters(3) + generateRandomNumber(4);

        // Insere o ticket no banco de dados
        const query = "INSERT INTO tickets (user_id, ticket_number, ticket_cost) VALUES (?, ?, ?)";
        const result = await db.promise().query(query, [user_id, ticket_number, ticket_cost]);

        res.status(201).json({ message: 'Ticket created successfully' , user })
    } catch (error) {
        console.error('Failed to create ticket:', error);
        res.status(500).json({ error: 'Failed to create ticket' });
    }
}

// Delete Ticket
exports.deleteTicketById = (req, res) => {
    const ticketId = req.params.id;

    const query = "DELETE FROM tickets WHERE ticket_id = ?";
    db.query(query, [ticketId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    });
}

// Delete All Tickets by User
exports.deleteAllTicketsByUserId = (req, res) => {
    const userId = req.params.userId;

    const query = "DELETE FROM tickets WHERE user_id = ?";
    db.query(query, [userId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'No tickets found for the user' })
        }
        res.status(200).json({ message: 'All tickets deleted successfully' })
    })
}

// Seleciona aleatoriamente um ticket como vencedor
exports.selectWinner = (req, res) => {
    const query = "SELECT * FROM tickets WHERE is_winner = 0 " 
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No tickets found' })
        }

        const winnerIndex = Math.floor(Math.random() * results.length)
        const winningTicket = results[winnerIndex]

        const updateQuery = "UPDATE tickets SET is_winner = 1 WHERE ticket_id = ?"
        db.query(updateQuery, [winningTicket.ticket_id], (updateError, updateResults) => {
            if (updateError) {
                return res.status(500).json({ error: updateError.message });
            }
            res.status(200).json({ message: 'Winner selected successfully', winner: winningTicket });
        })
    })
}
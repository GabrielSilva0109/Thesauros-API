const cors = require('cors');
const connection = require('./db');
const express = require('express');
const Web3 = require('web3');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

console.log('Starting the application...');

const userRoutes = require('./routes/UserRoutes');

app.use(express.json());
app.use(cors()); // Adicione CORS se for necessário

app.get('/', (req, res) => {
    res.send('Welcome to Thesauros!');
});

app.use('/api', (req, res, next) => {
    console.log('Received request for /api');
    next();
}, userRoutes);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to DATABASE:', err.stack);
            process.exit(1); // Saia do processo se a conexão falhar
        }
        console.log('Connected to DATABASE! Thread ID: ' + connection.threadId);
    });
});

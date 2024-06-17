const connection = require('./db')
const express = require('express')
const Web3 = require('web3')

const app = express()
const port = process.env.PORT || 3000

const userRoutes = require('./routes/UserRoutes')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Thesauros!')
})

app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
    connection.connect((err) => {
        if (err) {
            console.error('Erro connection DATABASE:', err.stack)
            return;
        }
        console.log('Connection DATABASE ON!! ' + connection.threadId)
    })
})
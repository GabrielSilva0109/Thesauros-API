const cors = require('cors')
const connection = require('./db')
const express = require('express')
const Web3 = require('web3')

//APIs
const userRoutes = require('./routes/userRoutes')
const ticketRoutes = require('./routes/ticketRoutes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
     res.send('Welcome to Thesauros!')
})

app.use('/api', userRoutes, ticketRoutes)
    

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
    connection.connect((err) => {
        if (err) {
            console.error('Error connection DATABASE:', err.stack)
            return;
        }
        console.log('Connection DATABASE ON!! ' + connection.threadId)
    })
})
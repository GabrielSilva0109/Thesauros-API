const express = require('express')
const Web3 = require('web3')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/api', (req, res) => {
    res.send('Bem-vindo ao Thesauros!')
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
const express = require('express')
const Web3 = require('web3')

const app = express()
const port = process.env.PORT || 3000

const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Thesauros BSC!')
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Bem-vindo ao Thesauros!')
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
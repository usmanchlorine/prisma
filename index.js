const express = require('express')
const app = express()
const port = 5000
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
    res.send({ message: 'hello world' })
})

app.use('/api/auth', require('./routes/auth'))
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
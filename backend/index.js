const express = require('express')
const client = require('./client/connect')
const createIndex = require('./createIndex/create')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.json({limit: '512mb'}))
app.use('/', require('./logIngestor/injestor'))
app.use('/api', require('./queryFilter/filter'))

createIndex('logs')

app.listen(port, () => {
    console.log(`Listening on : http://localhost:${port}`)
})

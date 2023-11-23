const express = require('express')
const client = require('../client/connect')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const operations = data.flatMap((doc) => [{index: {_index: 'logs'}}, doc])

        const bulkResponse = await client.bulk({operations})

        if(bulkResponse.errors == false)
            res.status(200).json({"status": "OK"})
        else
            res.status(bulkResponse.statusCode).json({"status": "ERROR"})
    }
    catch(err) {
        console.log(err)
        res.status(500).json({"status": "Internal server error"})
    }
})

module.exports = router

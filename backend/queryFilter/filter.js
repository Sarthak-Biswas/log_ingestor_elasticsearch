const express = require('express')
const client = require('../client/connect')
const router = express.Router()

router.post('/filter', async(req, res) => {

    try {
        filters = req.body

        q = {
            index: 'logs',
            query: {
                bool: {
                    must: []
                }
            }
        }

        if(!filters) {
            const resutl = await client.search({index : 'logs', query: {match_all: {}}})
            res.json(result.hits.hits)
        }

        else {

            if(filters.level) {
                if(!filters.level.regex) {
                    q.query.bool.must.push({match: {level: filters.level.data}})
                }
                else {
                    q.query.bool.must.push({regexp: {level: {value: filters.level.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.message) {
                if(!filters.message.regex) {
                    q.query.bool.must.push({match_phrase: {message: {query: filters.message.data}}})
                }
                else {
                    q.query.bool.must.push({regexp: {message: {value: filters.message.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.resourceId) {
                if(!filters.resourceId.regex) {
                    q.query.bool.must.push({match: {resourceId: filters.resourceId.data}})
                }
                else {
                    q.query.bool.must.push({regexp: {resourceId: {value: filters.resourceId.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.traceId) {
                if(!filters.traceId.regex) {
                    q.query.bool.must.push({match: {traceId: filters.traceId.data}})
                }
                else {
                    q.query.bool.must.push({regexp: {message: {value: filters.traceId.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.spanId) {
                if(!filters.spanId.regex) {
                    q.query.bool.must.push({match: {spanId: filters.spanId.data}})
                }
                else {
                    q.query.bool.must.push({regexp: {message: {value: filters.spanId.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.commit) {
                if(!filters.commit.regex) {
                    q.query.bool.must.push({match: {commit: filters.commit.data}})
                }
                else {
                    q.query.bool.must.push({regexp: {message: {value: filters.commit.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.parentResourceId) {
                if(!filters.parentResourceId.regex) {
                    q.query.bool.must.push({match: {"metadata.parentResourceId": filters.parentResourceId.data}})
                }
                else {
                    q.query.bool.must.push({regexp: {"metadata.parentResourceId": {value: filters.parentResourceId.data, flags: "ALL", case_insensitive: true}}})
                }
            }

            if(filters.timestamp) {
                q.query.bool.must.push({range: {timestamp: {gte: filters.timestamp.start, lte: filters.timestamp.end}}})
            }

            const result = await client.search(q)
            
            res.json(result.hits.hits)
        }
    }
    catch {
        res.status(500).json({"status": "Internal server error"})
    }
})

module.exports = router
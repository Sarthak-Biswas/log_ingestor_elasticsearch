const client = require('../client/connect')

const createIndex = (indexName) => {

    client.indices.create({index: indexName, settings: {number_of_shards: 3, number_of_replicas: 2, max_result_window: 1000000000}})
        .then(() => {
            console.log('Index Created...')
        })
        .catch((err) => {
            console.log("Some error occuerd", err)
        })
}

module.exports = createIndex
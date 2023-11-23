const client = require('./client/connect')

const check = () => {
    client.indices.exists('abc')
        .then((e) => console.log('exists'))
        .catch((e) => console.log('not exists'))
}

check()
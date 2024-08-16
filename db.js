const { Pool } = require('pg')
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'oluwaseun',
    password: 'password123',
    database: 'db213'
})

module.exports = pool;
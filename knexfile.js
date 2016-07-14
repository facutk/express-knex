module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        searchPath: 'knex,public'
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        searchPath: 'knex,public'
    }
}

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'facutk',
            password: 'matrix',
            database: 'todo'
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        searchPath: 'knex,public'
    }
}

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
    production: process.env.DATABASE_URL;
}

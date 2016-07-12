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
    heroku: process.env.NODE_ENV;
}

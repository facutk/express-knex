module.exports = {
    entry: './src/client.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: __dirname + '/public/',
        proxy: {
            '/api/*' : 'http://localhost:3000',
        }
    }
};

module.exports = {
    entry: './src/client.jsx',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
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

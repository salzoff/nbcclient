const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/lib/NBCClient.js',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader'}
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    }
};
const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src', 'lib', 'NBCClient.js'),
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: [path.resolve(__dirname, 'node_modules')]}
        ]
    },
    externals: {
        axios: 'axios'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'nbcclient.js',
        library: 'nbcclient',
        libraryExport: 'default',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this'
    }
};
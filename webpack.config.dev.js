require('./scripts/initEnv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/example/js/example.js',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', include: [path.resolve(__dirname, 'src')], exclude:[path.resolve(__dirname, 'node_modules')] }
        ]
    },
    output: {
        path: path.join (__dirname, 'build'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/example/index.html',
            filename: 'index.html',
            inject: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 9000
    }
};
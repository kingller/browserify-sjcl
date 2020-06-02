const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const args = require('node-args');
const isAnalyzer = args.analyzer;
const TARGET = `${__dirname}/dist`;

const mode = args.mode;

let config = {
    mode,
    entry: {
        'index': './lib/index.ts',
    },
    stats: isAnalyzer? 'normal': 'errors-warnings',
    output: {
        path: TARGET,
        filename: '[name].js',
        library: 'sjcl',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-typescript'],
                    plugins: [['@babel/plugin-transform-typescript', { allowNamespaces: true }]],
                },
                exclude: /\/node_modules\//
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /\/node_modules\//
            },
        ],
    },
    plugins: [new CleanWebpackPlugin([TARGET])],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
        ]
    },
    externals: { crypto: 'null'}
};

module.exports = config;

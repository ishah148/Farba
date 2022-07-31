/* eslint-disable prettier/prettier */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = {
    entry: path.resolve(__dirname, './scripts/main.js'),
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: ['style-loader', 'css-loader','postcss-loader','sass-loader'],
            },
            {
                test: /\.(svg|jpg|jpeg|gif|png)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/i,
                use: 'file-loader' 
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './pages/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './assets'),
                    to: path.resolve(__dirname, '../dist/assets'),
                },
                // {
                //     from: path.resolve(__dirname, './assets/svg'),
                //     to: path.resolve(__dirname, '../dist/assets/svg'),
                // },
            ],
        }),
    ],
    devServer: {
        inline: true,
        port: 8009,
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};

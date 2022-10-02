/* eslint-disable prettier/prettier */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');



const baseConfig = {
    entry: {
        index: path.resolve(__dirname, './scripts/main.js'),
        video: path.resolve(__dirname, './scripts/second_page.ts'),
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(svg|jpg|jpeg|gif|png|woff|woff2|ttf|eot)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        chunkFilename: '[id].[chunkhash].js', //!  ????
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './pages/index.html'),
            filename: 'index.html',
            chunks: ['index'], //!  ????
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./pages/video.html`),
            filename: `video.html`,
            chunks: [`video`] //!  ????
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './assets'),
                    to: path.resolve(__dirname, './dist/assets'),
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

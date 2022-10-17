/* eslint-disable prettier/prettier */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: {
        index: path.resolve(__dirname, './src/scripts/main.js'),
        video: path.resolve(__dirname, './src/scripts/second_page.ts'),
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './assetsResource/icons/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                include: [path.resolve(__dirname, './src/assets/fonts/')],
                type: 'asset/resource',
                generator: {
                    filename: './assetsResource/fonts/[name][ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: './scripts/[name].[contenthash:4].js',
        //chunkFilename: '[id].[chunkhash:4].js', //TODO Похоже понадобится для асинхронных модулей
        // https://webpack.js.org/configuration/output/#outputchunkfilename
    },                                          // https://dev.to/yadhus/what-is-output-webpack-5-cho
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            // filename: 'index.[hash:4].html',
            filename: 'index.html',
            chunks: ['index'],           //?
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./src/video.html`),
            // filename: `video.[hash:4].html`,
            filename: `video.html`,
            chunks: [`video`]            //?
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets'),
                    to: path.resolve(__dirname, './dist/assets'),
                    globOptions: {
                        ignore: [
                            '**/fonts/**',
                            '**/favicon.jpg',
                            '**/mailButton.png',
                            '**/phoneButton.png'
                        ]
                    }
                },
            ],
        }),
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};

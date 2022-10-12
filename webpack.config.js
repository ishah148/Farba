/* eslint-disable prettier/prettier */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(jpg|png)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './assetsResource/icons/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                include: [path.resolve(__dirname, './assets/fonts/')],
                type: 'asset/resource',
                generator: {
                    filename: './assetsResource/fonts/[name][ext]',
                },
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
        path: path.resolve(__dirname, './dist/'),
        filename: './scripts/[name].[contenthash:4].js',
        //chunkFilename: '[id].[chunkhash:4].js', //TODO Похоже понадобится для асинхронных модулей
        // https://webpack.js.org/configuration/output/#outputchunkfilename
    },                                          // https://dev.to/yadhus/what-is-output-webpack-5-cho
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './pages/index.html'),
            // filename: 'index.[hash:4].html',
            filename: 'index.html',
            chunks: ['index'],           //?
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./pages/video.html`),
            // filename: `video.[hash:4].html`,
            filename: `video.html`,
            chunks: [`video`]            //?
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './assets'),
                    to: path.resolve(__dirname, './dist/assets/'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: './styles/[name].[hash:4].css',
            chunkFilename: '[id].css',    //?
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        overlay: true,
        inline: true,
        port: 8009,
    },
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};

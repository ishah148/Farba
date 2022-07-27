/* eslint-disable prettier/prettier */
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = {
    entry: path.resolve(__dirname, './scripts/main.js'),
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader',{
                    loader: "postcss-loader",
                        options: {
                        postcssOptions: {
                            plugins: [
                                [
                                    "autoprefixer",
                                    {
                                        // Options
                                    },
                                ],
                            ],
                      },
                    }
                }],
            },
            {
                test: /\.(scss)$/,
                use: [{
                    // вставить CSS на страницу
                    loader: 'style-loader'
                }, {
                    // переводит CSS в модули CommonJS
                    loader: 'css-loader'
                },
                {
                    // компилирует Sass в CSS
                    loader: 'sass-loader'
                }]
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
        path: path.resolve(__dirname, '../dist'),
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

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    mode: 'production',
    // mode: 'development',
    target: ['web', 'es6'], //? по идее, влияет только на код, который генерирует сам вебпак
                            //? но почему-то вары всё равно есть в коде вебпака
    // target: 'browserslist',
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env', {
                                    targets: 'last 5 years'
                                }
                            ],
                            [
                                "@babel/preset-typescript", {
                                    targets: 'last 5 years'
                                }
                            ]
                        ],
                    },
                },
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './styles/[name].[hash:4].css',
            chunkFilename: '[id].css',    //?
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        // new CompressionPlugin({
        //     test: /\.(js|css|html)$/i,
        // }),
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,  //remove license files
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin({
                minimizerOptions: [{
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
                ]
            }),
        ],
        concatenateModules: true,
        splitChunks: {
            filename: './scripts/commonModules.[hash:4].js',
            minChunks: 2,
            chunks: 'all',
            minSize: 0,
        }
    },
    // мб devtool: 'source-map' (в отличие от dev.config devtool: 'inline-source-map',)
};

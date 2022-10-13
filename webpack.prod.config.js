const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    // mode: 'production',
    mode: 'development',
    target: ['web', 'es6'], // for babel (i think); comment if we need support for older browsers
    // target: 'browserslist', // for babel (i think); uncomment if we need support for older browsers
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
        new CompressionPlugin({
            test: /\.(js|css|html)$/i,
        }),
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,  //remove license files
                terserOptions: {
                    mangle: {
                        toplevel: true,  //TODO: doesn't work
                    },
                    output: {
                        comments: false, //TODO: doesn't work
                    },
                },
            })
        ],
        // minimize: false,   // for not mininmizing js (debug)
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

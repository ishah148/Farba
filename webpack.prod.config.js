const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    // mode: 'development',
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
        new MiniCssExtractPlugin({
            filename: './styles/[name].[hash:4].css',
            chunkFilename: '[id].css',    //?
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
    ],
    optimization: {
        minimize: true,
        // minimize: false,   // for not mininmizing js
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

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    // mode: 'development',
    target: ['web', 'es6'], // for babel (i think); comment if we need support for older browsers
    // target: 'browserslist', // for babel (i think); uncomment if we need support for older browsers
    plugins: [
        new CopyPlugin({   //? почему должны разделять по разным конфигам при изменении пути с ./dist/assets/ на ./dist/copyWebpackPlugin/
            patterns: [
                {
                    from: path.resolve(__dirname, './assets'),
                    to: path.resolve(__dirname, './dist/copyWebpackPlugin/'),
                },
            ],
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

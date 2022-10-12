const path = require('path');

module.exports = {
    mode: 'production',
    // mode: 'development',
    target: ['web', 'es6'], // for babel (i think); comment if we need support for older browsers
    // target: 'browserslist', // for babel (i think); uncomment if we need support for older browsers
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

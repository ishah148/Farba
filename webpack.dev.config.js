const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target:'web',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
    },
};

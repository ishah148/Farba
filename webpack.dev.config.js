const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        // host: '192.168.100.18',//your ip address
        // port: 8009,
    },
};

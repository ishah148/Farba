const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        // host: '192.168.100.18',//your ip address
        // port: 8009,
    },
};

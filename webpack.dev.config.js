const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    plugins: [
        new CopyPlugin({    //? почему должны разделять по разным конфигам при изменении пути с ./dist/assets/ на ./dist/copyWebpackPlugin/
            patterns: [
                {
                    from: path.resolve(__dirname, './assets'),
                    to: path.resolve(__dirname, './dist/assets/'), 
                },
            ],
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        // host: '192.168.100.18',//your ip address
        // port: 8009,
    },
};

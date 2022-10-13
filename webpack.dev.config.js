const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    },
    devServer: {
        // static: {
        //     directory: path.join(__dirname, './devfolder'),
        // },
        // devMiddleware: {
        //     writeToDisk: true,
        // },

        // client: {
        //     overlay: {
        //         errors: true,
        //         warnings: false,
        //       },
        // },
        // inline: true, //?
        hot: true,
        //compress: true, //?
        port: 8009,
        open: true,
        // host: '192.168.100.18',//your ip address
    },
    optimization: {
        runtimeChunk: 'single', //?
    },
};

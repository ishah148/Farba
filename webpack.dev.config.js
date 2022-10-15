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
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-typescript", {
                                    targets: 'last 2 versions'
                                }
                            ]
                        ],
                    },
                },
            }
        ]
    },
    devServer: {
        // static: {
        //     directory: path.join(__dirname, './dist'),
        // },
        // static: ['pages', 'scripts', 'styles'],
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
        // compress: true, //?
        port: 8009,
        open: true,
        // host: '192.168.100.18',//your ip address
    },
    optimization: {
        minimize: false, //? вроде и так выключено по дефолту в dev моде
        runtimeChunk: 'single',
        // runtimeChunk: {
        //     name: 'runtime',
        // }
    },
};

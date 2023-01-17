const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets'),
                    to: path.resolve(__dirname, './dist/assets'),
                    globOptions: {
                        ignore: [
                            '**/video-galery/**',
                            '**/fonts/**',
                            '**/favicon.jpg',
                            '**/mailButton.png',
                            '**/phoneButton.png'
                        ]
                    }
                },
            ],
        }),
    ],
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
        host: '192.168.100.7',  //your ip address (cmd => ipconfig)
    },
    optimization: {
        runtimeChunk: 'single',
        // runtimeChunk: {
        //     name: 'runtime',
        // }
    },
};

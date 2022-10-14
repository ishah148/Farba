module.exports = {
    plugins: [
        require("postcss-preset-env"),
        require('css-mqpacker'),
        // require('cssnano')({   // was replaced for CssMinimizerPlugin
        //     preset: 'default'
        // }),
    ]
}
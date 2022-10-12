module.exports = {
    plugins: [
        require("postcss-preset-env"),
        require('css-mqpacker'),
        require('cssnano')({
            preset: 'default'
        }),
    ]
}
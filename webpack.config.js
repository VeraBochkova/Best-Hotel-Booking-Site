let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

let conf = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: './dist'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    "style-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    conf.devtool = production
                    ? false
                    : 'evalsourcemap';
    return conf;
}
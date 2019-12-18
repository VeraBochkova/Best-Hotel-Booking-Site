const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist'
    },
    devServer: {
        overlay: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.cjs', '.less']
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
                    {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader
                , {
                    loader: 'css-loader',
                    options: {sourceMap: true}
                }, {
                    loader: 'less-loader',
                    options: {sourceMap: true}
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].css'
        })
    ]
}
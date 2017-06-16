
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "src/entry.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js",
        // publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader"
                }),
            },
            {
                test: /\.scss$/,
                // use: ExtractTextPlugin.extract({
                //     use: ["css-loader", "autoprefixer-loader", "sass-loader"],
                // }),
                loader: ["style-loader", "css-loader", "autoprefixer-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg)/,
                loader: ["url-loader?limit=81920"],
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: {
                    loader: 'babel-loader',
                        options: {
                        presets: ['env']
                    }
                }
            }
        ],
    },
    plugins: [
        // 多个模板文件可多次调用
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "views/in.blade.php",
            chunks: ["shareIn"]
        }),
        // new ExtractTextPlugin("share.css"),
    ],
    // 第三方CDN资源
    externals: {
        jquery: "jQuery",
        layer: "layer"
    }
};
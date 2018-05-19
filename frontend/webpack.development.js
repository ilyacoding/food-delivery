//Enabling this option cause access node-specific variable
/*eslint-env node*/

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const sourcePath = path.join(path.resolve(), "src");
const outputPath = path.join(path.resolve(), "dist");

module.exports = {
    context: sourcePath,

    entry: {
        main: [
            "react-hot-loader/patch",
            "./index.jsx"
        ]
    },

    output: {
        path: outputPath,
        publicPath: "/",
        filename: "[name].[hash].js"
    },

    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules")
        ]
    },

    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emmitError: true
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: "sass-loader"
                    }]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }]
            }
        ]
    },

    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin({
            title: "iQuizArt",
            template: path.join(sourcePath, "index.tmpl.html")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],

    devServer: {
        contentBase: outputPath,
        hot: true,
        port: 80,
        historyApiFallback: {
            disableDotRule: true
        }
    }
};
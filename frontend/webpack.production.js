//Enabling this option cause access node-specific variable
/*eslint-env node*/

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSCSS = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    allChunks: true
});
const StyleLintPlugin = require("stylelint-webpack-plugin");

const sourcePath = path.join(path.resolve(), "src");
const outputPath = path.join(path.resolve(), "dist");

module.exports = {
    context: sourcePath,

    entry: {
        main: "./index.jsx",
        vendor: Object.keys(require("./package.json").dependencies).filter(name => (name != "font-awesome"))
    },

    output: {
        path: outputPath,
        publicPath: "/",
        filename: "[name].[chunkhash].js"
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
                use: extractSCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader", {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [
                                require("autoprefixer")()
                            ]
                        }
                    }]
                })
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
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin([outputPath]),
        new HtmlWebpackPlugin({
            title: "iQuizArt",
            template: path.join(sourcePath, "index.tmpl.html")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.[hash].js"
        }),
        extractSCSS,
        new StyleLintPlugin({
            failOnError: true
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};
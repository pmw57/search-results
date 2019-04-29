/*jslint node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        "searchresults": "./src/index.js"
    },
    output: {
        filename: "js/[name].js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: "./src/static/index.html",
            filename: "../dist/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorPluginOptions: {
                preset: ["default", {
                    discardComments: {removeAll: true}
                }]
            },
            canPrint: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: [
                    path.join(__dirname, "src")
                ],
                query: {
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: "inline-source-map"
};

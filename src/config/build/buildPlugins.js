import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack  from "webpack";

export function buildPlugins({mode, paths}){
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins = [
        new HtmlWebpackPlugin({ template: paths.html })
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
        
    }

    return plugins
}
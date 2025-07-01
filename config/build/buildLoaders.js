import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders(options){
    const isDev = options.mode === 'development'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
    }

    const scssLoader = {
        test: /\.(scss|css)$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
        ],
    }

    return [
        assetLoader,
        scssLoader,
    ]
}
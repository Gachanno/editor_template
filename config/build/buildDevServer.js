

export function buildDevServer({port, paths}){
    return {
        port: port ?? 3000,
        static: './build',
        historyApiFallback: true,
        hot: true,
        static: {
            directory: paths.public
        }
    }
}
import { buildDevServer } from './buildDevServer.js';
import { buildLoaders } from './buildLoaders.js';
import { buildPlugins } from './buildPlugins.js';
import { buildResolvers } from './buildResolvers.js';

export function buildWebpack(options) {
    const {mode, paths} = options
    const isDev = mode === 'development'

    return {
            mode: options.mode ?? 'development',
            entry: paths.entry,
            output: {
                path: paths.output,
                filename: '[name].[contenthash].js',
                clean: true
            },
            plugins: buildPlugins(options),
            module: {
                rules: buildLoaders(options),
            },
            resolve: buildResolvers(options),
            devServer: isDev ? buildDevServer(options): undefined,
            devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        }
}
const parse = require('yargs-parser');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ThemedProgressPlugin } = require('themed-progress-plugin');

// 解析命令行参数：--mode=development / production
const argv = parse(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _modeFlag = _mode === 'production';
// 引入对应模式的配置（如 config/webpack.development.js）
const modeConfig = require(`./config/webpack.${_mode}.js`);

const webpackBaseConfig = {
    entry: {
        main: resolve(__dirname, 'src/index.tsx'),
    },
    output: {
        path: resolve(process.cwd(), 'dist'),
        filename: _modeFlag ? '[name].[contenthash:8].js' : '[name].js',
        publicPath: '/', // 可根据部署路径调整
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'swc-loader',
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    'postcss-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json', '.css'],
        alias: {
            '@': resolve(__dirname, 'src/'),
            '@components': resolve(__dirname, 'src/components'),
            '@hooks': resolve(__dirname, 'src/hooks'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@layouts': resolve(__dirname, 'src/layouts'),
            '@assets': resolve(__dirname, 'src/assets'),
            '@states': resolve(__dirname, 'src/states'),
            '@service': resolve(__dirname, 'src/service'),
            '@utils': resolve(__dirname, 'src/utils'),
            '@lib': resolve(__dirname, 'src/lib'),
            '@constants': resolve(__dirname, 'src/constants'),
            '@connections': resolve(__dirname, 'src/connections'),
            '@abis': resolve(__dirname, 'src/abis'),
            '@types': resolve(__dirname, 'src/types'),
            '@graphql': resolve(__dirname, 'src/graphql'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeFlag
                ? 'styles/[name].[contenthash:8].css'
                : 'styles/[name].css',
            chunkFilename: _modeFlag
                ? 'styles/[id].[contenthash:8].css'
                : 'styles/[id].css',
        }),
        new ThemedProgressPlugin(),
    ],
};

module.exports = merge(webpackBaseConfig, modeConfig);

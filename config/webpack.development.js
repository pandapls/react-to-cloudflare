const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const port = 3003;
module.exports = {
    devServer: {
        historyApiFallback: true,
        static: {
            directory: join(__dirname, '../dist'),
        },
        hot: true,
        port,
        client: {
            logging: 'warn',
            overlay: true
        }
    },
    output: {
        publicPath: '/',
        //如果是通过loader 编译的 放到scripts文件夹里 filename
        filename: 'scripts/[name].bundle.js',
        //如果是通过'asset/resource' 编译的
        assetModuleFilename: 'images/[name].[ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react webopack project',
            filename: 'index.html',
            template: resolve(__dirname, '../public/index-dev.html'),
            favicon: './public/favicon.ico',

        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`🚀 App is running at ${`http://localhost:${port}`}`],
            },
            onErrors: function (severity, errors) {
                if (severity !== 'error') {
                    return;
                }
                const error = errors[0];
                console.log(error);
                // notifier.notify({
                //     title: '👒 Webpack Build Error',
                //     message: severity + ': ' + error.name,
                //     subtitle: error.file || '',
                //     icon: join(__dirname, 'icon.png'),
                // });
            },
            clearConsole: true,
        }),
        // new BundleAnalyzerPlugin()
    ]
};
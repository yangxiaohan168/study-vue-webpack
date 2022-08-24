const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/main.js',
  output: {
    //filename: 'bundle.js',
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean:true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '管理输出',
      templateContent: `
      <html>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `
    }), 
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css"
    }),
    new VueLoaderPlugin()
  ],
  mode: 'development',
  devServer: {
    port: 8081,
    watchFiles: ['src/**/*'],
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      { test: /\.vue$/i, use: ['vue-loader'] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            },
        },
        generator: {
            filename: 'images/[contenthash][ext][query]',
        },
       },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
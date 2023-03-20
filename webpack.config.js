const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
module.exports = {
  entry: {
      path: './src/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
          test: /\.vue$/,
          use: 'vue-loader'
      },
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   loader: "ts-loader",
      //   options: {
      //     appendTsSuffixTo: [/\.vue$/],
      //   },
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: 'asset',
        generator: {
          filename: "images/[name]-[hash][ext]",
        }
      }
    ],
  },
  output: {
      filename: 'assets/js/[name].[contenthash:6].js',
      path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.ts','.js'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false,
    }),
  ]
}
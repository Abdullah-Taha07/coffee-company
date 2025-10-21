const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 👇 كل الصفحات هنا
const pages = ['index', 'product', 'coffee', 'turkish', 'distributors', 'cappuccino'];

// توليد الـ HtmlWebpackPlugin حسب مسار الصفحة
const htmlPlugins = pages.map((name) => {
  const isIndex = name === 'index';
  return new HtmlWebpackPlugin({
    template: isIndex ? `./src/index.html` : `./src/pages/${name}.html`,
    filename: `${name}.html`,
  });
});

module.exports = {
  entry: [
    './src/assets/js/main.js',
    './src/assets/sass/main.scss'
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]'
  },

  module: {
    rules: [
      // JavaScript + Babel
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            "sourceType": "unambiguous"
          }
        }
      },

      // SCSS/SASS (باستخدام MiniCssExtractPlugin في الإنتاج)
      {
        test: /\.scss$/i,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      // CSS فقط
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },

      // صور
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][hash][ext]'
        }
      },

      // الخطوط
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][hash][ext]'
        }
      },

      // HTML
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    ...(process.env.NODE_ENV === 'production' ? [new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css'
    })] : []),

    new CleanWebpackPlugin(),
    ...htmlPlugins
  ],

  resolve: {
    extensions: ['.js', '.scss']
  },

  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',

  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true
  }
};

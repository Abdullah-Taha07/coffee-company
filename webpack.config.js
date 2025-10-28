// استيراد مكتبات التعامل مع المسارات وملفات ES Modules
import path from 'path';
import { fileURLToPath } from 'url';

// HtmlWebpackPlugin: لتوليد ملفات HTML وربطها بالـ JS/CSS تلقائيًا
import HtmlWebpackPlugin from 'html-webpack-plugin';

// MiniCssExtractPlugin: لاستخراج ملفات CSS في ملفات مستقلة
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// CleanWebpackPlugin: لتنظيف مجلد dist قبل كل build
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// CssMinimizerPlugin: لتصغير ملفات CSS
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

// TerserPlugin: لتصغير ملفات JS
import TerserPlugin from 'terser-webpack-plugin';

// Webpack: للوصول إلى DefinePlugin والمتغيرات
import webpack from 'webpack';

// fs: للتعامل مع ملفات النظام (هنا لقراءة HTML Pages تلقائيًا)
import fs from 'fs';

// تحديد وضع الإنتاج أو التطوير
const isProduction = process.env.NODE_ENV === 'production';

// إصلاح __dirname في ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== جلب جميع HTML Pages تلقائيًا من مجلد src =====
const htmlDir = path.resolve(__dirname, 'src');
const htmlPages = fs
  .readdirSync(htmlDir)
  .filter(file => file.endsWith('.html'))
  .map(file => file.replace('.html', ''));

// ===== JS Entries =====
const entries = {
  main: './src/index.js',
  product: './src/assets/js/product.js',
};

export default {
  // نقطة البداية (entries)
  entry: entries,

  // إعدادات المخرجات (output)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,

    // 🔹 السطر المضاف لضبط المسار في GitHub Pages
    publicPath: isProduction ? '/coffee-company/' : '/',
  },

  // ===== Rules للـ Modules =====
  module: {
    rules: [
      // ملفات JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      // ملفات CSS و SCSS
      {
        test: /\.(scss|css)$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sassOptions: { quietDeps: true } },
          },
        ],
      },

      // الصور
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
        generator: { filename: 'images/[name][hash][ext]' },
      },

      // الخطوط
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][hash][ext]' },
      },
    ],
  },

  // ===== Plugins =====
  plugins: [
    new CleanWebpackPlugin(),

    // توليد HTML Pages تلقائيًا وربط كل JS Entries معها
    ...htmlPages.map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/${page}.html`,
        filename: `${page}.html`,
        chunks: Object.keys(entries),
        minify: isProduction
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            }
          : false,
      });
    }),

    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

  // ===== Optimization =====
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
  },

  // ===== DevServer =====
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 9000,
    open: true,
    hot: true,
  },

  // ===== Resolve =====
  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: { '@': path.resolve(__dirname, 'src') },
  },

  mode: isProduction ? 'production' : 'development',

  devtool: isProduction ? false : 'source-map',
};

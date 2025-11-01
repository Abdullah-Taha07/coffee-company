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
// سيبحث عن أي ملف .html في src ويحوّله إلى اسم الصفحة بدون .html
const htmlDir = path.resolve(__dirname, 'src');
const htmlPages = fs
  .readdirSync(htmlDir) // قراءة جميع الملفات في src
  .filter(file => file.endsWith('.html')) // الاحتفاظ بالملفات التي تنتهي بـ .html فقط
  .map(file => file.replace('.html', '')); // إزالة الامتداد للحصول على اسم الصفحة

// ===== JS Entries =====
// هنا نحدد ملفات JS الأساسية للـ bundle
const entries = {
  main: './src/index.js',         // الملف الأساسي يحتوي على معظم الأكواد
  product: './src/assets/js/product.js', // الملف الثاني يحتوي على باقي الأكواد المشتركة
};

export default {
  // نقطة البداية (entries)
  entry: entries,

  // إعدادات المخرجات (output)
  output: {
    path: path.resolve(__dirname, 'dist'), // مجلد المخرجات النهائي
    filename: isProduction ? 'js/[name].[contenthash].js' : 'js/[name].js', // تسمية ملفات JS حسب الوضع
    assetModuleFilename: 'assets/[hash][ext][query]', // مسار الملفات الثابتة مثل الصور والخطوط
    clean: true, // تنظيف مجلد dist قبل كل build
  },

  // ===== Rules للـ Modules =====
  module: {
    rules: [
      // ملفات JavaScript
      {
        test: /\.js$/,          // أي ملف ينتهي بـ .js
        exclude: /node_modules/, // استثناء مكتبات node_modules
        use: 'babel-loader',     // استخدام Babel لتحويل JS حديث إلى قديم متوافق مع المتصفحات
      },

      // ملفات CSS و SCSS
      {
        test: /\.(scss|css)$/i, // أي ملف CSS أو SCSS
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // في الإنتاج استخراج CSS، في التطوير استخدام style-loader
          'css-loader',           // تحويل CSS إلى JS ليتم تحميله
          {
            loader: 'sass-loader', // لتحويل SCSS إلى CSS
            options: { sassOptions: { quietDeps: true } }, // تجاهل التحذيرات الخاصة بالـ dependencies
          },
        ],
      },

      // الصور (PNG, JPG, GIF, SVG)
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset', // Webpack 5 asset type
        parser: { dataUrlCondition: { maxSize: 10 * 1024 } }, // تحويل الصور الصغيرة إلى Base64
        generator: { filename: 'images/[name][hash][ext]' }, // تسمية ملفات الصور في dist
      },

      // الخطوط
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource', // نقل الملف كما هو
        generator: { filename: 'fonts/[name][hash][ext]' }, // مسار ملفات الخطوط
      },
    ],
  },

  // ===== Plugins =====
  plugins: [
    // تنظيف مجلد dist قبل كل build
    new CleanWebpackPlugin(),

    // توليد HTML Pages تلقائيًا وربط كل JS Entries معها
    ...htmlPages.map(page => {
      return new HtmlWebpackPlugin({
        template: `./src/${page}.html`, // الملف الأصلي لكل HTML
        filename: `${page}.html`,       // اسم الملف النهائي في dist
        chunks: Object.keys(entries),   // تضمين جميع ملفات JS المحددة في entries
        minify: isProduction            // إذا كان الوضع إنتاجي، تصغير HTML
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
            }
          : false,
      });
    }),

    // استخراج ملفات CSS في ملفات مستقلة
    new MiniCssExtractPlugin({
      filename: isProduction ? 'css/[name].[contenthash].css' : 'css/[name].css',
    }),

    // تعريف متغيرات البيئة داخل JS
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],

  // ===== Optimization =====
  optimization: {
    minimize: isProduction, // تمكين التصغير في الإنتاج
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()], // تصغير JS و CSS
    splitChunks: { chunks: 'all' }, // تقسيم الأكواد المشتركة لتقليل حجم الباندل
    runtimeChunk: 'single',          // تحسين الكاشينغ
  },

  // ===== DevServer =====
  devServer: {
    static: path.resolve(__dirname, 'dist'), // مجلد static للـ dev server
    port: 9000,                               // رقم البورت
    open: true,                               // فتح المتصفح تلقائيًا
    hot: true,                                // تفعيل HMR (Hot Module Replacement)
  },

  // ===== Resolve =====
  resolve: {
    extensions: ['.js', '.scss', '.css'], // الملفات التي يمكن استيرادها بدون كتابة الامتداد
    alias: { '@': path.resolve(__dirname, 'src') }, // اختصار @ للـ src
  },

  // الوضع (production/development)
  mode: isProduction ? 'production' : 'development',

  // أدوات التصحيح
  devtool: isProduction ? false : 'source-map', // source-map فقط في التطوير
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Для копирования файлов

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Этот файл теперь будет пустым
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Для обработки CSS
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Уберите это, если не хотите использовать Babel
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Шаблон HTML
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/styles.css', to: 'styles.css' }, // Копируем CSS файл
        { from: 'src/script.js', to: 'script.js' },   // Копируем JS файл
      ],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
  },
};

const path = require('path');

module.exports = {
  entry: './demo/index.ts',
  devServer: {
      contentBase: [path.join(__dirname, 'demo'), path.join(__dirname, 'dist')],
      compress: true, 
      port: 9000,
      open: 'http://localhost:9000'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
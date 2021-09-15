const path = require('path')

module.exports = {
  entry: {
    index: './caloriecounter/frontend/src/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'caloriecounter/frontend/static/frontend'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
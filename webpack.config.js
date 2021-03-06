const path = require('path')

module.exports = {
  entry: {
    index: './frontend/src/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'frontend/static/frontend'),
  },
  resolve: {
    extensions: ['.jsx', '...'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env"
          ]
        }
      },
      {
        test: /\.ts$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env", "@babel/preset-typescript"
          ]
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node-modules/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env", "@babel/preset-react"
          ]
        }
      }
    ]
  }
}
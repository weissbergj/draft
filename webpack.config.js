const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './public/editor/editor.js', // Entry point for the editor
  output: {
    filename: 'bundle.js', // Output file for the bundle
    path: path.resolve(__dirname, 'public/editor'), // Output directory
    publicPath: '/editor/', // Ensures the assets are served from /editor path
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Support modern JS and React
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from public
    },
    port: 8080, // Development server port
    hot: true, // Enable Hot Module Replacement (HMR)
    historyApiFallback: {
      index: '/editor/index.html', // Ensure proper routing for single-page apps
    },
    client: {
      webSocketURL: {
        hostname: 'localhost', // Ensure WebSocket uses the correct hostname
        port: 8080, // Use the same port as Webpack Dev Server
        pathname: '/ws', // Default WebSocket path
      },  
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/editor/index.html', // Generate HTML and inject the bundle
      filename: 'index.html', // Output filename
    }),
  ],
};
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
};

module.exports = [
  {
    ...config,
    target: 'node',
    output: {
      filename: 'index.node.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        type: 'commonjs2',
      }
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.node$/,
          use: 'node-loader'
        }
      ]
    }
  },
  {
    ...config,
    target: 'web',
    output: {
      filename: 'index.web.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        type: 'commonjs2',
      }
    },
  },
];

const path = require('path');

module.exports = {
  entry: './src/mermaid-plugin.js',
  output: {
    filename: 'mermaid-plugin.webpack.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map'
};

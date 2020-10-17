const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  entry: './src/vscode_extension.ts',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  output: {
    filename: 'vscode_extension.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
    devtoolModuleFilenameTemplate: '[resource-path]',
  },
  devtool: 'source-map',
};

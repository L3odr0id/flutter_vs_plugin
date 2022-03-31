import * as path from 'path';
import * as webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

const config: webpack.Configuration = {
  // VSCode extensions run in webworker context for VS Code web
  target: 'webworker',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    // The vscode-module is created on-the-fly and must be excluded.
    vscode: 'commonjs vscode'
  },
  resolve: {
    mainFields: ['main'],
    extensions: ['.ts'],
    plugins: [
      // Plugin for using aliases from tsconfig paths
      new TsconfigPathsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  }
};

export default config;

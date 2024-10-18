const { DefinePlugin } = require("webpack");
module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env.HASH_ROUTER': JSON.stringify(process.env.HASH_ROUTER || 'false')
    })
  ],
  resolve: {
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          'ts-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
            }
          }
        ]
      }
    ],
  },
};

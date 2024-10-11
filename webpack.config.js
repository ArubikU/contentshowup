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
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'], // Extensiones para resolver archivos
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, // Para archivos .ts y .tsx
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
  
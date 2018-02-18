let webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  cache: true,
  entry: ['./DEV_ONLY/dev.js'],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    alias: {
      react: path.join(__dirname, '/node_modules/react'),
    },
  },
  output: {
    filename: 'react-jsx-super-table.js',
    publicPath: 'http://localhost:3000/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: [
            [
              'env',
              {
                loose: true,
                targets: {
                  browsers: ['last 2 versions', 'ie 11'],
                },
              },
            ],
            'react',
            ['env', { modules: false }],
            'stage-2',
          ],
          plugins: [],
        },
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/',
        options: {
          configFile: './.eslintrc',
          emitError: true,
          failOnError: true,
          failOnWarning: false,
          formatter: require('eslint-friendly-formatter'),
          fix: true,
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  externals: [{ fs: '{}' }, { tls: '{}' }, { 'utf-8-validate': '{}' }, { bufferutil: '{}' }],
  devtool: 'source-map',
  devServer: {
    contentBase: 'assets',
    inline: true,
    port: 3000,
    stats: {
      assets: false,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false,
    },
    watchOptions: {
      ignore: /node_modules/,
    },
  },
};

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { darkTheme } = require('@ant-design/dark-theme');

const pathsToClean = ['dist'];
const cleanOptions = {
  root: __dirname,
  verbose: true,
  dry: false,
  exclude: [],
};

module.exports = function (_env, argv) {
  const isProduction = _env.TARGET_ENV === 'production';
  const isStaging = _env.TARGET_ENV === 'staging';
  isStaging ? (isProduction = true) : null;

  const isLocal = _env.TARGET_ENV === 'local';
  const isDevelopment = _env.TARGET_ENV === 'dev' || isLocal;
  console.log('env', isProduction, isStaging, isLocal, isDevelopment);

  return {
    mode: 'production',
    devtool: isDevelopment ? 'cheap-module-source-map' : 'source-map',
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/[name].[hash:8]11.js',
      publicPath: '/',
    },
    module: {
      rules: [
        { test: /\.pdf$/, use: 'file-loader?name=[path][name].[ext]' },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development',
            },
          },
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.less$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                modifyVars: darkTheme,
              },
            },
          ],
        },

        {
          test: /\.scss$/,
          issuer: { exclude: /\.less$/ },
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'sass-loader',
          ],
        },

        {
          test: /\.scss$/,
          issuer: /\.less$/,
          use: {
            loader: './sassVarsToLess.js',
          },
        },
        {
          test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          // loaders: [
          //   'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          //   'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
          // ],
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.mjs', '.js', '.jsx'],
      alias: {
        Assets: path.resolve(__dirname, './src/assets/'),
        Atoms: path.resolve(__dirname, './src/app/atoms/'),
        Modules: path.resolve(__dirname, './src/app/modules/'),
        Molecules: path.resolve(__dirname, './src/app/molecules/'),
        Translate: path.resolve(__dirname, './src/translate/'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@configs': path.resolve(__dirname, 'src/configs'),
        '@atoms': path.resolve(__dirname, 'src/app/atoms/'),
        '@molecules': path.resolve(__dirname, 'src/app/molecules/'),
        '@modules': path.resolve(__dirname, 'src/app/modules/'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@features': path.resolve(__dirname, 'src/features'),
      },
    },

    plugins: [
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'assets/css/[name].[hash:8].css',
          chunkFilename: 'assets/css/[name].[hash:8].chunk.css',
        }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        inject: true,
      }),
      new CleanWebpackPlugin(cleanOptions),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      new Dotenv({
        path:
          isLocal && isDevelopment
            ? './Environment/.env.local'
            : !isLocal && isDevelopment
            ? './Environment/.env'
            : isStaging
            ? './Environment/.env.stag'
            : './Environment/.env.prod',
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxInitialRequests: 10,
        maxAsyncRequests: 10,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `${cacheGroupKey}.${packageName.replace('@', '')}`;
            },
          },
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: 'single',
    },
    devServer: {
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
      overlay: true,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};

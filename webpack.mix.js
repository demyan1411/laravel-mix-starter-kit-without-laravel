const { mix } = require('laravel-mix');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let createPages = require('./build/createPages');
let path = require('path');

// mix.disableNotifications();

mix.webpackConfig({
    resolve: {
      extensions: ['*', '.js', '.json', '.vue', '.scss', '.pug']
    },
    module: {
        rules: [
          {
              test: /\.font\.(js|json)$/,
              loader: ExtractTextPlugin.extract({
                  use: [
                      'raw-loader',
                      {
                          loader: 'string-replace-loader',
                          options: {
                              search: 'url\\("/',
                              replace: 'url("/',
                              flags: 'gm'
                          },
                      },
                      'webfonts-loader'
                  ]
              })
          },
          {
              test: /\.pug$/,
              loaders: ['pug-loader?pretty=true']
          },
        ]
    },
    plugins: [
      // new CleanWebpackPlugin(['dist/*'], {
      //   root: __dirname,
      //   verbose: false
      // }),

      ...createPages(),
    ]
});

mix.browserSync({
    proxy: false,
    server: 'dist',
    files: [
        'app/**/*.php',
        'resources/views/**/*.php',
        'dist/js/**/*.js',
        'dist/css/**/*.css',
        'dist/*.html'
    ]
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.setPublicPath('dist/');

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery'],
    tether: ['window.Tether', 'Tether']
});

mix.js('src/assets/js/app.js', 'assets/js')
   .extract(['jquery','bootstrap','vue','tether']);

mix.sass('src/assets/scss/app.scss', 'assets/css');

// pathFromPublic(publicPath) {
//     publicPath = path.normalize(publicPath || Config.publicPath);
//
//     let extra = this.filePath.startsWith(publicPath) ? publicPath : '';
//     let folderPath = path.join(Mix.paths.root(extra), path.sep);
//
//     return this.path().replace(folderPath, '');
// }

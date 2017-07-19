const { mix } = require('laravel-mix');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let createPages = require('./build/createPages');
let getEntryPages = require('./build/getEntryPages');
let path = require('path');

mix.disableNotifications();

mix.options({
  processCssUrls: false,
  postCss: [require('autoprefixer')]
});

mix.webpackConfig({
    resolve: {
      extensions: ['*', '.js', '.json', '.vue', '.scss', '.pug'],
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        'src': path.resolve(__dirname, 'src'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'js': path.resolve(__dirname, 'src/assets/js'),
        'images': path.resolve(__dirname, 'src/assets/images'),
        'fonts': path.resolve(__dirname, 'src/assets/fonts')
      }
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
      new CleanWebpackPlugin(['dist/*'], {
        root: __dirname,
        verbose: false
      }),

      new ExtractTextPlugin('css/[name].css', {
        allChunks: true
    }),

      ...createPages(),
    ]
});

mix.browserSync({
    proxy: false,
    // proxy: "localhost",
    // serveStatic: ['dist'],
    server: 'dist',
    files: [
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

mix.setPublicPath(path.normalize('dist'));
// mix.setResourceRoot('../');

// mix.autoload({
//     jquery: ['$', 'window.jQuery', 'jQuery'],
//     tether: ['window.Tether', 'Tether']
// });



mix.js('src/assets/js/main/main.js', 'js/main');
// mix.extract(['jquery','bootstrap','vue','tether']);
mix.sass('src/assets/scss/main.scss', 'css/main');
mix.copyDirectory('src/assets/images', 'dist/images')

getEntryPages();

// pathFromPublic(publicPath) {
//     publicPath = path.normalize(publicPath || Config.publicPath);
//
//     let extra = this.filePath.startsWith(publicPath) ? publicPath : '';
//     let folderPath = path.join(Mix.paths.root(extra), path.sep);
//
//     return this.path().replace(folderPath, '');
// }

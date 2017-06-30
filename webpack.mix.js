const { mix } = require('laravel-mix');

// mix.disableNotifications();

mix.browserSync({
    // proxy: 'localhost:8080'
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

mix.setPublicPath(__dirname + "/dist")

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery'],
    tether: ['window.Tether', 'Tether']
});

mix.js('src/assets/js/app.js', 'js')
   .extract(['jquery','bootstrap','vue','tether']);

mix.sass('src/assets/scss/app.scss', 'css');

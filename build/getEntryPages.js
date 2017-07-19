const { mix } = require('laravel-mix');

const path = require('path')
const fs = require('fs')

module.exports = function () {
    // const js = fs.readdirSync(path.resolve(__dirname, '../frontend/src/assets/js/manifests'));
    // const scss = fs.readdirSync(path.resolve(__dirname, '../frontend/src/assets/scss/manifests'));

    const pages = fs.readdirSync(path.resolve(__dirname, '../src/pages'));
    pages.forEach(page => {
        mix.js(`src/pages/${page}/${page}.js`, `js/${page}`)
            .sass(`src/pages/${page}/${page}.scss`, `css/${page}`);
    });

    // const entry = {};

    // js.forEach(page => {
    //     mix.js(`frontend/src/assets/js/manifests/${page}`, 'js');
    // });

    // scss.forEach(page => {
    //     mix.sass(`frontend/src/assets/scss/manifests/${page}`, 'css');
    // });

    // mix.js(`frontend/src/pages/awards/index.js`, 'assets/js')
    //
    // entry.font_icons = "./src/assets/js/font_icons";
    // entry.vendor = "./src/assets/js/vendor";
    // entry.app = './src/assets/js/main';
    //
    // return entry;
}

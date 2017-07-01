const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function () {
    let pages = fs.readdirSync(path.resolve(__dirname, '../src/templates/pages'));

    let htmlPages = pages.map(page => {
        let pageName = page.split('.')[0];
        let options = {
            filename: process.env.NODE_ENV === 'production'
                ? path.resolve(__dirname, '../dist/' + pageName + '.html')
                : pageName + '.html',
            template: 'src/templates/pages/' + pageName,
            inject: true,
            minify: false
        }

        return new HtmlWebpackPlugin(options)
    });

    return htmlPages;
}

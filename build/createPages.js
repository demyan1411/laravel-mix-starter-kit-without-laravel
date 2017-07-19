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
            minify: false,
            chunksSortMode: function(c1, c2) {
                let orders = ['manifest', 'vendor', 'main', pageName.split('-').join('_')];
                let o1 = orders.indexOf(c1.names[0]);
                let o2 = orders.indexOf(c2.names[0]);
                return o1 - o2;
            },
            chunks: ['manifest', 'vendor', 'main', pageName.split('-').join('_')]
        }

        return new HtmlWebpackPlugin(options)
    });

    return htmlPages;
}

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');
const path = require('path');


console.log(2323, process.cwd())

const compiler = webpack(webpackConfig);

function addNewWidgetEntry(widgetName, entryPath) {
    return new Promise(resolve => {
        console.log(23234)
        new SingleEntryPlugin(
            process.cwd(),
            entryPath,
            widgetName
        ).apply(compiler);
    });
}

setTimeout(() => {
    addNewWidgetEntry('entry2', path.resolve(__dirname, '../src/entry-2.js'));
}, 3000)



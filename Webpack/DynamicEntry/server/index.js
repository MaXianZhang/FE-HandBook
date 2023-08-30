const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js')
const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

const compiler = webpack(webpackConfig);
compiler.run();

function addNewWidgetEntry(fileName, entryPath) {
    return new Promise(resolve => {
        console.log(23234, process.cwd(), entryPath, fileName)
        new SingleEntryPlugin(
            process.cwd(),
            entryPath,
            fileName
        ).apply(compiler);
    });
}

setTimeout(() => {
    addNewWidgetEntry('entry2', './src/entry-2');
    compiler.run();
}, 3000)



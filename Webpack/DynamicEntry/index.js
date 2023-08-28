import SingleEntryPlugin from 'webpack/lib/SingleEntryPlugin';
import webpackConfig from './webpack.prod.config.js';

const compiler = webpack(webpackConfig);

function addSingleEntry(compiler) {
    new SingleEntryPlugin(
        process.cwd(),
        entryPath,
        widgetName
    ).apply(compiler);
}








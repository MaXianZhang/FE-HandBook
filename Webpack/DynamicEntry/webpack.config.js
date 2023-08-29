const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        entry1: './src/entry-1'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
    }
}
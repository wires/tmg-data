let R = require('ramda')
let path = require('path')

let rootDir = path.dirname(__dirname)
let relpath = args => path.join.apply(path.join, R.prepend(rootDir, args))

let dirs = {
    manufacturers: (name, fn) => relpath(['data', 'manufacturers', name, fn]),
    data: fn => relpath(['data', fn]),
    modules: (manufacturerName, moduleName, fileName) => relpath([
        'data', 'modules', manufacturerName, moduleName, fileName
    ])
}

module.exports = dirs
let load_yaml = require('./load_yaml.js')
let load_markdown = require('./load_markdown.js')
let dirs = require('./directories.js')

let R = require('ramda')
let glob = require('glob')
let path = require('path')

function load_module(manufacturerName, moduleName) {
    console.log(`  - LOAD_MODULE: "${manufacturerName}" — "${moduleName}"`)
    let e = ext => dirs.modules(manufacturerName, moduleName, `${manufacturerName}-${moduleName}.${ext}`)
    let markdown = load_markdown(e('md'))
    let info = load_yaml(e('yaml'))
    return {
        manufacturer: manufacturerName,
        identifier: moduleName,
        markdown: markdown.markdown,
        info: info,
        image: `${manufacturerName}/${moduleName}/${manufacturerName}-${moduleName}.jpg`
    }
}

function load_all_modules () {
    let module_files = glob.sync(dirs.modules('*', '*', '*.jpg'))
    let moduleName = s => path.basename(path.dirname(s))
    let manufacturerName = s => path.basename(path.dirname(path.dirname(s)))
    
    let modules = R.map(fn => load_module(
        manufacturerName(fn),
        moduleName(fn)
    ), module_files)
    return modules
}

let modules = load_all_modules()

module.exports = modules

// console.log(JSON.stringify(modules))
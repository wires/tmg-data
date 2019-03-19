let load_yaml = require('./load_yaml.js')
let load_markdown = require('./load_markdown.js')
let dirs = require('./directories.js')

let R = require('ramda')
let glob = require('glob')
let path = require('path')

function load_manufacturer(name) {
    let e = ext => dirs.manufacturers(name, `${name}.${ext}`)
    let markdown = load_markdown(e('md'))
    let info = load_yaml(e('yaml'))
    return {
        identifier: name,
        markdown: markdown.markdown,
        info: info
    }
}

function load_all_manufacturers () {
    let mfns = glob.sync(dirs.manufacturers('*', '*.md'))
    let name = s => path.basename(path.dirname(s))
    let names = R.map(name, mfns)
    let manufacturers = R.map(load_manufacturer, names)
    return manufacturers
}

let manufacturers = load_all_manufacturers()

module.exports = manufacturers

// console.log(JSON.stringify(manufacturers))
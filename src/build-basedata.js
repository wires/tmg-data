let load_yaml = require('./load_yaml.js')
let dirs = require('./directories.js')

let functions = load_yaml(dirs.data('functions.yaml'))

let product_lifecycle = {
    1: 'Currently Available',
    2: 'Discontinued',
    3: 'Concept or Prototype'
}

let build_type = {
    1: 'Assembled',
    2: 'DIY'
}

let data = {
    functions, product_lifecycle, build_type
}

module.exports = data
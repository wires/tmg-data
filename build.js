let R = require('ramda')
let fs = require('fs')
let path = require('path')

let public = s => path.join(__dirname, 'public', s)
let publicModule = s => path.join(__dirname, 'public', 'modules', s)

console.log('loading base data')
let base = require("./src/build-basedata.js")

console.log('  * writing base data `base.json`')
fs.writeFileSync(public('base.json'), JSON.stringify(base)) 

console.log('loading manufacturers')
let manufacturers = require("./src/build-manufacturers.js")
console.log(`number of manufacturers: ${manufacturers.length}`)
console.log('  * writing manufacturer data `manufacturers.json`')
fs.writeFileSync(public('manufacturers.json'), JSON.stringify(manufacturers))

console.log('loading modules')
let modules = require("./src/build-modules.js")

console.log(`number of modules: ${modules.length}`)
console.log(`  * writing "modules.json"`)
let module_data = R.map(m =>
    [m.manufacturer, m.identifier, m.info.name, m.info.width, m.info.price.euro || 0]
, modules)
fs.writeFileSync(public('modules.json'), JSON.stringify(module_data))

let write_module = mod => {
    console.log(`  * writing "${mod.manufacturer}-${mod.identifier}.json"`)
    let fn = publicModule(`${mod.manufacturer}-${mod.identifier}.json`)
    fs.writeFileSync(fn, JSON.stringify(mod))
}

R.forEach(write_module, modules)
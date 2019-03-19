let yaml = require('js-yaml')
let fs = require('fs')

module.exports = function load(filename) {
    try {
        return yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
      } catch (e) {
        console.log(e);
        process.exit(1);
      }
}

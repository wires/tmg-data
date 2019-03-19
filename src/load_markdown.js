let md = require('markdown-it')()
let fs = require('fs')

module.exports = function load_markdown(filename) {
    try {
        let markdown = fs.readFileSync(filename, 'utf8')
        let html = md.render(markdown);
        return {markdown, html}
      } catch (e) {
        console.log(e);
        process.exit(1);
      }
}
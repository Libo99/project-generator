const CURR_DIR = process.cwd()
const fs = require('fs')

const createPkg = (files, templatePath, newProjectPath) => {
  files
    .filter((f) => f === 'package.json')
    .forEach((element) => {
      const pkg = require(`${templatePath}/${element}`)
      const newPath = `${CURR_DIR}/${newProjectPath}/package.json`
      pkg.name = newProjectPath
      fs.writeFileSync(newPath, JSON.stringify(pkg, null, 2))
    })
}

module.exports = createPkg

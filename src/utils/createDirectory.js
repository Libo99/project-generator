const fs = require('fs')
const createPkg = require('./createPkg')
const CURR_DIR = process.cwd()

exports.createDirectoryContents = (templatePath, newProjectPath) => {
  const filesToCreate = fs.readdirSync(`${templatePath}`)

  createPkg(filesToCreate, templatePath, newProjectPath)

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`

    // get stats about the current file
    const stats = fs.statSync(origFilePath)

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8')
      if (file === 'package.json') return
      // Rename
      if (file === '.npmignore') file = '.gitignore'

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`
      // console.log(writePath);
      fs.writeFileSync(writePath, contents, 'utf8')
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`)

      // recursive call
      this.createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      )
    }
  })
}

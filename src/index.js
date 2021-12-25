#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
const { cyan, blue, green, yellow, red, lightCyan } = require('kolorist')
const { createDirectoryContents } = require('./utils/createDirectory')
const argv = process.argv.slice(2)

const cwd = process.cwd()

const frameworks = [
  {
    name: 'react',
    color: cyan,
    variants: [
      { name: 'react', display: 'JavaScript', color: yellow },
      { name: 'react-ts', display: 'TypeScript', color: blue }
    ]
  },
  {
    name: 'nextjs',
    color: lightCyan,
    variants: [
      { name: 'nextjs', display: 'JavaScript', color: yellow },
      { name: 'nextjs-ts', display: 'TypeScript', color: blue }
    ]
  },
  {
    name: 'vue',
    color: green,
    variants: [
      { name: 'vue', display: 'JavaScript', color: yellow },
      { name: 'vue-ts', display: 'TypeScript', color: blue }
    ]
  },
  {
    name: 'svelte',
    color: red,
    variants: [
      { name: 'svelte', display: 'JavaScript', color: yellow },
      { name: 'svelte-ts', display: 'TypeScript', color: blue }
    ]
  }
]

const init = async () => {
  let targetDir = argv[0]
  let defaultName = !targetDir ? 'my-app' : targetDir

  const checkValidName = (input) => {
    if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true
    else return red('\nInvalid Project Name')
  }
  try {
    await inquirer
      .prompt([
        {
          type: targetDir ? null : 'input',
          name: 'projectName',
          message: 'Add the name for the project',
          default: defaultName,
          validate: (answer) => checkValidName(answer),
          when: !targetDir
        },
        {
          type: 'list',
          name: 'framework',
          message: 'choose a framework',
          choices: frameworks.map((framework) => {
            const color = framework.color
            return {
              value: framework,
              name: color(framework.name)
            }
          })
        },
        {
          type: 'list',
          name: 'variant',
          message: 'choose a variant',
          choices({ framework }) {
            return framework.variants.map((variant) => {
              const color = variant.color
              return {
                name: color(variant.name),
                value: variant
              }
            })
          }
        }
      ])
      .then(({ framework, variant, projectName }) => {
        const name = !targetDir ? projectName : targetDir
        const templatePath = `${__dirname}/templates/template-${variant.name}`
        fs.mkdirSync(`${cwd}/${name}`)
        createDirectoryContents(templatePath, name)
        console.log(
          `\nGenerating ${framework.name} project in ${cwd}/${name}...`
        )

        console.log('\nDone!')
        console.log('\nNow run: ')
        console.log(`\ncd ${name}`)
        console.log('npm install')
        console.log(
          `${framework.name === 'react' ? 'npm start' : 'npm run dev'}`
        )
      })
  } catch (error) {
    console.log(error)
  }
}
init().catch((err) => console.log(err))

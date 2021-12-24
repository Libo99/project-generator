#!/usr/bin/env node
const inquirer = require('inquirer')
const fs = require('fs')
// const path = require('path');
const { cyan, blue, green, yellow, red, lightCyan } = require('kolorist')
const { createDirectoryContents } = require('./utils/createDirectory')

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
  try {
    await inquirer
      .prompt([
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
        },
        {
          type: 'input',
          name: 'projectName',
          message: 'Add the name for the project',
          validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true
            else return red('\nInvalid Project Name ')
          }
        }
      ])
      .then(({ variant, projectName }) => {
        const templatePath = `${__dirname}/templates/template-${variant.name}`

        fs.mkdirSync(`${cwd}/${projectName}`)
        createDirectoryContents(templatePath, projectName)

        console.log(cyan('\nApp generated!'))

        console.log('\n--------------------------')
        console.log('\ncd <project-name>')
        console.log('\nnpm install')
        console.log('\nEnjoy!')
        console.log('\n--------------------------')
      })
  } catch (error) {
    console.log(error)
  }
}
init().catch((err) => console.log(err))

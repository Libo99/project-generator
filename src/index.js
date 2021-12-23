const inquirer = require('inquirer');
const fs = require('fs');
// const path = require('path');
const { cyan, blue, green, yellow, red, lightCyan } = require('kolorist');
const { createDirectoryContents } = require('./createDirectory');

const cwd = process.cwd();

const reactApp = fs.readdirSync(`${__dirname}/templates/template-react`);

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
];

const init = async () => {
  try {
    await inquirer
      .prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'choose a framework',
          choices: frameworks.map((framework) => {
            const color = framework.color;
            return {
              value: framework,
              name: color(framework.name)
            };
          })
        },
        {
          type: 'list',
          name: 'variant',
          message: 'choose a variant',
          choices({ framework }) {
            return framework.variants.map((variant) => {
              const color = variant.color;
              return {
                name: color(variant.name),
                value: variant
              };
            });
          }
        },
        {
          type: 'input',
          name: 'projectName',
          message: 'Add project name',
          validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else return 'Project name is not allowed';
          }
        }
      ])
      
      .then(({ framework, variant, projectName }) => {
        switch(framework.name === 'react') {
          case variant.name === 'react':
            fs.mkdirSync(`${cwd}, ${projectName}`);
            createDirectoryContents(reactApp, projectName);
            break;
          default:
            break;
        }
      });
    //   .then(({ framework }) => {
    //     inquirer
    //       .prompt([
    //         {
    //           type: "list",
    //           name: "language",
    //           message: "choose a Language",
    //           choices: framework.variants.map((variant) => {
    //             const color = variant.color;
    //             return {
    //               value: variant,
    //               name: color(variant.name),
    //             };
    //           }),
    //         },
    //       ])
    //       .then(({ language }) =>
    //         console.log(`Generating a ${framework} project ${language.name} `)
    //       );
    //   });
  } catch (error) {
    console.log(error);
  }
};
init().catch(err => console.log(err));

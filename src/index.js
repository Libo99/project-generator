const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { cyan, blue, green, yellow, red, lightCyan } = require("kolorist");

const frameworks = [
  {
    name: "react",
    color: cyan,
    variants: [
      { name: "JavaScript", color: yellow },
      { name: "TypeScript", color: blue },
    ],
  },
  {
    name: "nextjs",
    color: lightCyan,
    variants: [
      { name: "JavaScript", color: yellow },
      { name: "TypeScript", color: blue },
    ],
  },
  {
    name: "vue",
    color: green,
    variants: [
      { name: "JavaScript", color: yellow },
      { name: "TypeScript", color: blue },
    ],
  },
  {
    name: "svelte",
    color: red,
    variants: [
      { name: "JavaScript", color: yellow },
      { name: "TypeScript", color: blue },
    ],
  },
];

inquirer
  .prompt([
    {
      type: "list",
      name: "framework",
      message: "choose a framework",
      choices: frameworks.map((framework) => {
        const color = framework.color;
        return {
          value: framework,
          name: color(framework.name),
        };
      }),
    },
    {
      type: "list",
      name: "language",
      message: "choose a language",
      choices({ framework }) {
        return framework.variants.map((variant) => {
          const color = variant.color;
          return {
            name: color(variant.name),
            value: variant,
          };
        });
      },
    },
  ])
  .then(({ framework, language }) =>
    console.log(`Making a ${framework.name} project with ${language.name}`)
  );
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

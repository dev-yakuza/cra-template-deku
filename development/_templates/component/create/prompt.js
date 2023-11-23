// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'Component type:',
    choices: ['atoms', 'molecules', 'organisms', 'templates', 'pages'],
  },
  {
    type: 'input',
    name: 'name',
    message: 'Component name:',
  },
]

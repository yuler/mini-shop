/**
 * @type {import('prettier').Options}
 */

const base = require('../../.prettierrc.json')

module.exports = {
  ...base,
  overrides: [
    {
      files: '*.wxml',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.wxss',
      options: {
        parser: 'css',
      },
    },
  ],
}

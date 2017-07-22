// @flow
import path from 'path'
import { format } from 'prettier'

import s2s from '../../src/index'

const prettierOpts = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
}

const prettierHook = (eventPath, code) => {
  if (path.extname(eventPath) === '.js') {
    return format(code, prettierOpts)
  }
  return code
}

const templateDir = path.resolve(__dirname, 'templates')
const setInput = p => path.join(templateDir, p)

s2s({
  watch: './**/*.js',
  plugins: [
    {
      test: /actionTypes.js$/,
      output: 'actions.js',
      plugin: ['create-redux-action-func', { actionTypes: 'actionTypes.js' }],
    },
  ],
  templates: [
    { test: /reducer.js/, input: setInput('reducer.js') },
    { test: /reducer.test.js/, input: setInput('reducer.test.js') },
  ],
  afterHooks: [prettierHook],
})

// @flow
import handler, { DEFAULT_CONFIG } from '.'

const setup = () => {
  return {
    eventPath: '',
    filename: 'dummy.js',
  }
}

test('return flow definition', () => {
  const css = `
    .a {color: red;}
  `
  const result = handler(css, setup())
  expect(result.code).toMatchSnapshot()
})

test('snapshot DEFAULT_CONFIG', () => {
  expect(DEFAULT_CONFIG).toMatchSnapshot()
})

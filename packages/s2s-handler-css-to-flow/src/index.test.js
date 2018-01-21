// @flow
import handler from '.'

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

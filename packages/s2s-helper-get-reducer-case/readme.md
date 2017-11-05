# s2s-helper-get-reducer-case

> Helper function to get reducer case


## API

```js
import helper from 's2s-helper-get-reducer-case'

const fixture = `
export default function(state, action) {
  switch(action.type) {
    case Actions.INCREMENT:
      return { count: state + 1}
    case Actions.DECREMENT:
      return { count: state - 1}
    default:
      return state
  }
}
`

helper(fixture)
// => ['INCREMENT', 'DECREMENT']
```

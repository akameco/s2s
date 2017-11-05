# s2s-helper-get-action-obj

> Helper function to get action object


## API

```js
import getActionObj from 's2s-helper-get-action-obj'

const fixture = `
export const Actions = {
  INCREMENT,
  DECREMENT,
}
`

helper(fixture)
// => ['INCREMENT', 'DECREMENT']
```

# s2s-helper-get-initial-state

> Helper function to get initialState


## API

```js
import helper from 's2s-helper-get-initial-staet'

const fixture = `
export const initialState = {
  count: 0
}
`

helper(fixture)
// Node "ObjectExpression"
//   properties: Array [
//     Node "ObjectProperty"
//       computed: false
//       key: Node "Identifier"
//         name: "count"
//       method: false
//       shorthand: false
//       value: Node "NumericLiteral"
//         extra: Object {
//           "raw": "1",
//           "rawValue": 1,
//         }
//         value: 1,
//   ]
```

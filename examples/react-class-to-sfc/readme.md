## Run

```
yarn s2s
```

## s2s

```js
import * as React from 'react'

class App extends React.Component {
  render() {
    return <div>Hello SFC :)</div>
  }
}

export default App

↓ ↓ ↓

import * as React from 'react'

function App(props) {
  return <div>Hello SFC :)</div>
}

export default App
```

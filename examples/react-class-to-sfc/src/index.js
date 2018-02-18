import * as React from 'react'

class App extends React.Component {
  onClick = () => {
    console.log('remove onClick & save')
  }
  render() {
    return <div>Hello SFC :)</div>
  }
}

export default App

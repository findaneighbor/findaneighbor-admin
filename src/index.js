import React from 'react'
import { render } from 'react-dom'

export const App = props => {
  return <main className='h-screen flex-center'>
    <h1 className='text-green-500'>Find A Neighbor Admin</h1>
  </main>
}

render(<App />, document.getElementById('app'))

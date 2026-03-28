import React from 'react'

import MiddleComponent from './components/MiddleComponent'
import LeftMargin from './components/LeftMargin'
import RightMargin from './components/RIghtMargin'

const App = () => {
  return (
    <div style={{display:'flex', justifyContent:"space-between", gap:10}}>
      <LeftMargin/>
      <MiddleComponent/>
      <RightMargin/>
    </div>
  )
}

export default App
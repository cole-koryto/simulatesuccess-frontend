import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputBox from './components/InputBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <InputBox />
      </div>
    </>
  )
}

export default App

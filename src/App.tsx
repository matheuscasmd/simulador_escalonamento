import { Outlet } from 'react-router-dom'
import './App.css'
import { Menu } from './components/Menu'

function App() {
  return (
    <div className='w-full max-h-screen overflow-x-hidden fullscreen-rectangle '>
      <div className='flex flex-row w-screen'>
        <Menu/>
        <div className='flex flex-col items-center justify-center w-full'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
import { useState } from 'react'
import './App.css'
import { Menu } from './components/Menu'
import { Config } from './components/Config'

function App() {
  const [numeroProcessos,setNumeroProcessos] = useState<number>()
  const [quantum,setQuantum] = useState<number>()
  const [sobrecarga,setSobrecarga] = useState<number>()
  const [configurado,setConfigurado] = useState(false)


  const handleProcessosChange = (value : string) => {
    setNumeroProcessos(Number(value))
  }
  const handleQuantumChange = (value : string) => {
    setQuantum(Number(value))
  }
  const handleSobrecargaChange = (value : string) => {
    setSobrecarga(Number(value))
  }
  

  return (
    <div className='fullscreen-rectangle '>
    <div className='flex flex-row w-screen'>
      <Menu/>
      <div className='flex flex-row items-center justify-center w-full'>
      <Config
      processos={numeroProcessos}
      quantum={quantum}
      sobrecarga={sobrecarga}
      setProcessos={handleProcessosChange}
      setQuantum={handleQuantumChange}
      setSobrecarga={handleSobrecargaChange}
      variante={"configurado"}
      />
      </div>
    </div>
    </div>
  )
}

export default App



// interface Processo {
//   tempoChegada : number
//   tempoParaExecutar : number
//   deadline?: number
//   quantum : number
//   sobrecarga  : number
// }







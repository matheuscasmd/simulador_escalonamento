import { useState } from 'react'
import './App.css'
import { Menu } from './components/Menu'
import { Config } from './components/Config'
import { Escalonador } from './Escalonador'

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
  
  const processos = [
    { id: 1, tempoChegada: 0, tempoCompletar: 10, tamanho: 5, deadline: 20 },
    { id: 2, tempoChegada: 2, tempoCompletar: 8, tamanho: 3, deadline: 18 },
    { id: 3, tempoChegada: 4, tempoCompletar: 12, tamanho: 7, deadline: 30 },
    { id: 4, tempoChegada: 6, tempoCompletar: 6, tamanho: 4, deadline: 25 },
  ];

  const algoritmoProcessos = "FIFO";
  const algoritmoPaginas = "FIFO";

  return (
    <div className='fullscreen-rectangle '>
    <div className='flex flex-row w-screen'>
      <Menu/>
      <div className='flex flex-row items-center justify-center w-full'>
      <Escalonador processos={processos} algoritmoPaginas={algoritmoPaginas} algoritmoProcessos={algoritmoProcessos}></Escalonador>
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







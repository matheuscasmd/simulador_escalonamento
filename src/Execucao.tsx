import './App.css'
import { EsteiraExecucao } from './components/EsteiraExecucao'


type Estado = "ram" | "execucao" | "sobrecarga" | "disco" | "ausente" | "finalizado"
const estados: Estado[] = ["ram", "execucao", "sobrecarga", "disco", "ausente", "finalizado"];

const testeAleatorio: Estado[][] = 
  Array.from({ length: 4 }, () =>
    Array.from({ length: 100 }, () =>
      estados[Math.floor(Math.random() * estados.length)] // Gera um estado aleatório garantido do tipo Estado
    )
  )

function Execucao() {
  return (
      <div className='flex flex-col items-center justify-center w-full'>
      <EsteiraExecucao lista={testeAleatorio}></EsteiraExecucao>
      </div>
  )
}

export default Execucao



// interface Processo {
//   tempoChegada : number
//   tempoParaExecutar : number
//   deadline?: number
//   quantum : number
//   sobrecarga  : number
// }







import { useEffect,useState } from 'react';
import './App.css'
import AlgoritmoForm from './components/AlgoritmoForm';
import { EsteiraExecucao } from './components/EsteiraExecucao'
import { IProcesso } from './algoritmos/IProcesso';
import { fifo } from './algoritmos/processos/fifo';
import { MemoriaCard } from './components/Memoria';



const VELOCIDADES_PREDEFINIDAS = [1, 2, 5, 10]

function Execucao() {
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [output,setOutput] = useState<{ output: number[][], average_turnaround: number, ramHistory:(number | null)[][],discoHistory: (number | null)[][] }>()
  const [executar,setExecutar] = useState(false)
  const [velocidade, setVelocidade] = useState<number>(1)
  const [algoritmoMemoria,setAlgoritmoProcessos] = useState()
  const [algoritmoProcessos,setAlgoritmoMemoria] = useState()

  const handleVelocidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVelocidade(Number(e.target.value))
  }

  useEffect(() => {
    const processosSalvos = localStorage.getItem("processos");
    if (processosSalvos) {
        const processosArray: IProcesso[] = JSON.parse(processosSalvos);
        setProcessos(processosArray);
    }
  }, []);
  
  useEffect(()=>{
    setOutput(fifo(processos))
  },[processos])

    

  function getProcessosAlgoritmo(alg : "FIFO" | "EDF" | "RR" | "SJF"){
    switch(alg){
      case "FIFO":
        return fifo
      case "EDF":
        return edf
      case "RR":
        return RR
      case "SJF":
        return SJF
    }
  }
  
  return (
    output && 
      <div className='flex flex-col items-center justify-center w-full pr-80 pl-10'>
      <div className='flex flex-row w-full items-start pb-4 gap-4'>
      <div className='flex flex-col w-full items-center gap-2'>
      <AlgoritmoForm setExecutar={()=>setExecutar(!executar)}/>
      {executar && <div className="flex items-center gap-4 sticky left-0">
        <span className="text-[#00FF00] text-lg font-medium">Velocidade: </span>
        <select
          value={velocidade}
          onChange={handleVelocidadeChange}
          className="bg-[#2A2A2A] text-[#00FF00] border border-[#333333] rounded-lg px-4 py-2 text-xl"
        >
          {VELOCIDADES_PREDEFINIDAS.map((v) => (
            <option key={v} value={v}>
              {v}x
            </option>
          ))}
        </select>
      </div>}
      </div>
      {executar && <MemoriaCard RAMvsTempo={output?.ramHistory.slice(1)} DISCOvsTempo={output?.discoHistory.slice(1)} velocidade={velocidade}/>}
      </div>
      {executar && <EsteiraExecucao lista={output?.output} turnaround={output.average_turnaround} velocidade={velocidade} />}
      </div>
  )
}

export default Execucao





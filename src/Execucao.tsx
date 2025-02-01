import { useEffect,useState } from 'react';
import './App.css'
import AlgoritmoForm from './components/AlgoritmoForm';
import { EsteiraExecucao } from './components/EsteiraExecucao'
import { IProcesso } from './algoritmos/IProcesso';
import { fifo } from './algoritmos/processos/fifo';
import { MemoriaCard } from './components/Memoria';




function Execucao() {
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [output,setOutput] = useState<{ output: number[][], average_turnaround: number, ramHistory:(number | null)[][],discoHistory: (number | null)[][] }>()
  const [executar,setExecutar] = useState(false)


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

    
  
  return (
    output && 
      <div className='flex flex-col items-center justify-center w-full pr-80 pl-10'>
      <div className='flex flex-row w-full items-start pb-4 gap-4'>
      <AlgoritmoForm setExecutar={()=>setExecutar(!executar)}/>
      {executar && <MemoriaCard RAMvsTempo={output?.ramHistory} DISCOvsTempo={output?.discoHistory} velocidade={200}/>}
      </div>
      {executar && <EsteiraExecucao lista={output?.output} turnaround={output.average_turnaround} />}
      </div>
  )
}

export default Execucao





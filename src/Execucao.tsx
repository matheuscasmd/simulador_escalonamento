import { useEffect,useState } from 'react';
import './App.css'
import AlgoritmoForm from './components/AlgoritmoForm';
import { EsteiraExecucao } from './components/EsteiraExecucao'
import { IProcesso } from './algoritmos/IProcesso';
import { fifo } from './algoritmos/processos/fifo';
import { MemoriaCard } from './components/Memoria';
import { edf } from './algoritmos/processos/edf';
import { rr } from './algoritmos/processos/roundrobin';
import { sjf } from './algoritmos/processos/sjf';



const VELOCIDADES_PREDEFINIDAS = [1, 2, 5, 10]

function Execucao() {

  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [output,setOutput] = useState<number[][]>([[]])
  const [RAMvsTempo,setRAMvsTempo] = useState<(number|null)[][]>() 
  const [DiscovsTempo,setDiscovsTempo] = useState<(number|null)[][]>() 
  const [executar,setExecutar] = useState(false)
  const [velocidade, setVelocidade] = useState<number>(1)
  const [quantum,setQuantum] = useState<number>(0)
  const [sobrecarga,setSobrecarga] = useState<number>(0)
  const [turnaround,setTurnaround] = useState(0)
  const [algoritmoMemoria,setAlgoritmoMemoria] = useState<"FIFO" | "MRU">("FIFO")

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

  useEffect(() => {
    const processosSalvos = localStorage.getItem('processos');
    const config = localStorage.getItem("config")
    if(config){
      const parsed = JSON.parse(config)
      const algoritmo = getProcessosAlgoritmo(parsed.algoritmoProcessos)
      setQuantum(Number(parsed.quantum))
      setSobrecarga(Number(parsed.sobrecarga))
      setOutput(algoritmo.output)
      setDiscovsTempo(algoritmo.discoHistory)
      setRAMvsTempo(algoritmo.ramHistory)
      setTurnaround(algoritmo.average_turnaround)
      setAlgoritmoMemoria(parsed.algoritmoMemoria)
    }
    if (processosSalvos) setProcessos(JSON.parse(processosSalvos));
  }, [executar]);


    

  function getProcessosAlgoritmo(alg : "FIFO" | "EDF" | "RR" | "SJF"){
    switch(alg){
      case "FIFO":
        return fifo(processos,algoritmoMemoria)
      case "EDF":
        return edf(processos,quantum,sobrecarga,algoritmoMemoria)
      case "RR":
        return rr(processos,quantum,sobrecarga,algoritmoMemoria)
      case "SJF":
        return sjf(processos,algoritmoMemoria)
    }
  }
  
  return (
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
      {executar && RAMvsTempo && DiscovsTempo && <MemoriaCard RAMvsTempo={RAMvsTempo.slice(1)} DISCOvsTempo={DiscovsTempo.slice(1)} velocidade={velocidade}/>}
      </div>
      {executar &&  output && turnaround && <EsteiraExecucao lista={output} turnaround={turnaround} velocidade={velocidade} />}
      </div>
  )
}

export default Execucao





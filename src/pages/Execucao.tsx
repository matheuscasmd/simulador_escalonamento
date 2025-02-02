import { useEffect,useState } from 'react';
import AlgoritmoForm from '../components/AlgoritmoForm';
import { EsteiraExecucao } from '../components/EsteiraExecucao'
import { IProcesso } from '../algoritmos/IProcesso';
import { fifo } from '../algoritmos/processos/fifo';
import { MemoriaCard } from '../components/Memoria';
import { edf } from '../algoritmos/processos/edf';
import { rr } from '../algoritmos/processos/roundrobin';
import { sjf } from '../algoritmos/processos/sjf';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';



const VELOCIDADES_PREDEFINIDAS = [1, 2, 5, 10]

function Execucao() {

  const [processos, setProcessos] = useState<IProcesso[]>([]);

  const [outputEDF,setOutputEDF] = useState<number[][]>([[]])
  const [RAMvsTempoEDF,setRAMvsTempoEDF] = useState<(number|null)[][]>() 
  const [DiscovsTempoEDF,setDiscovsTempoEDF] = useState<(number|null)[][]>()
  const [turnaroundEDF,setTurnaroundEDF] = useState(0)


  const [outputFIFO,setOutputFIFO] = useState<number[][]>([[]])
  const [RAMvsTempoFIFO,setRAMvsTempoFIFO] = useState<(number|null)[][]>() 
  const [DiscovsTempoFIFO,setDiscovsTempoFIFO] = useState<(number|null)[][]>()  
  const [turnaroundFIFO,setTurnaroundFIFO] = useState(0)


  const [outputSJF,setOutputSJF] = useState<number[][]>([[]])
  const [RAMvsTempoSJF,setRAMvsTempoSJF] = useState<(number|null)[][]>() 
  const [DiscovsTempoSJF,setDiscovsTempoSJF] = useState<(number|null)[][]>()
  const [turnaroundSJF,setTurnaroundSJF] = useState(0)


  const [outputRR,setOutputRR] = useState<number[][]>([[]])
  const [RAMvsTempoRR,setRAMvsTempoRR] = useState<(number|null)[][]>()
  const [DiscovsTempoRR,setDiscovsTempoRR] = useState<(number|null)[][]>()
  const [turnaroundRR,setTurnaroundRR] = useState(0)



  const [executar,setExecutar] = useState(false)
  const [velocidade, setVelocidade] = useState<number>(1)
  const [quantum,setQuantum] = useState<number>(0)
  const [sobrecarga,setSobrecarga] = useState<number>(0)
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
      setQuantum(Number(parsed.quantum))
      setSobrecarga(Number(parsed.sobrecarga))
      setAlgoritmoMemoria(parsed.algoritmoMemoria)
    }
    if (processosSalvos) setProcessos(JSON.parse(processosSalvos));
  }, [executar]);


  useEffect(()=>{
    let alg1 = fifo(processos,algoritmoMemoria)
    let alg2 = sjf(processos,algoritmoMemoria)
    let alg3 = rr(processos,quantum,sobrecarga,algoritmoMemoria)
    let alg4 =  edf(processos,quantum,sobrecarga,algoritmoMemoria)

    setOutputFIFO(alg1.output)
    setDiscovsTempoFIFO(alg1.discoHistory)
    setRAMvsTempoFIFO(alg1.ramHistory)
    setTurnaroundFIFO(alg1.average_turnaround)

    setOutputSJF(alg2.output)
    setDiscovsTempoSJF(alg2.discoHistory)
    setRAMvsTempoSJF(alg2.ramHistory)
    setTurnaroundSJF(alg2.average_turnaround)

    setOutputRR(alg3.output)
    setDiscovsTempoRR(alg3.discoHistory)
    setRAMvsTempoRR(alg3.ramHistory)
    setTurnaroundRR(alg3.average_turnaround)

    setOutputEDF(alg4.output)
    setDiscovsTempoEDF(alg4.discoHistory)
    setRAMvsTempoEDF(alg4.ramHistory)
    setTurnaroundEDF(alg4.average_turnaround)
  },[processos,algoritmoMemoria,sobrecarga,quantum])

  
  return (
      <div className={`flex flex-col items-center justify-center w-full h-screen mx-auto ${ true ? "pt-20" : ""} `}>
      <div className='flex flex-row w-full items-start pb-4'>
      <div className='flex flex-col w-full items-center gap-2 justify-center'>
      <AlgoritmoForm executar={executar} setExecutar={()=>setExecutar(!executar) }/>
      {executar && <div className="flex items-center gap-4 left-0">
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
      </div>
      {executar && outputFIFO && outputEDF && outputSJF && outputRR && DiscovsTempoFIFO && DiscovsTempoEDF &&  DiscovsTempoSJF && DiscovsTempoRR && RAMvsTempoFIFO && RAMvsTempoEDF && RAMvsTempoSJF  && RAMvsTempoRR && <Tabs defaultValue='FIFO'>
        <TabsList>
          <TabsTrigger value='FIFO'>FIFO</TabsTrigger>
          <TabsTrigger value='EDF'>EDF</TabsTrigger>
          <TabsTrigger value='SJF'>SJF</TabsTrigger>
          <TabsTrigger value='RR'>RR</TabsTrigger>
        </TabsList>
        <TabsContent value='FIFO'>
          <MemoriaCard DISCOvsTempo={DiscovsTempoFIFO} RAMvsTempo={RAMvsTempoFIFO} velocidade={velocidade}></MemoriaCard>
          <EsteiraExecucao lista={outputFIFO} turnaround={turnaroundFIFO} velocidade={velocidade}/>
        </TabsContent>
        <TabsContent value='EDF'>
          <MemoriaCard DISCOvsTempo={DiscovsTempoEDF} RAMvsTempo={RAMvsTempoEDF} velocidade={velocidade}></MemoriaCard>
          <EsteiraExecucao lista={outputEDF} turnaround={turnaroundEDF} velocidade={velocidade}/>
        </TabsContent>
        <TabsContent value='SJF'>
          <MemoriaCard DISCOvsTempo={DiscovsTempoSJF} RAMvsTempo={RAMvsTempoSJF} velocidade={velocidade}></MemoriaCard>
          <EsteiraExecucao lista={outputSJF} turnaround={turnaroundSJF} velocidade={velocidade}/>
        </TabsContent>
        <TabsContent value='RR'>
          <MemoriaCard DISCOvsTempo={DiscovsTempoRR} RAMvsTempo={RAMvsTempoRR} velocidade={velocidade}></MemoriaCard>
          <EsteiraExecucao lista={outputRR} turnaround={turnaroundRR} velocidade={velocidade}/>
        </TabsContent>
      </Tabs>}
      </div>
  )
}

export default Execucao





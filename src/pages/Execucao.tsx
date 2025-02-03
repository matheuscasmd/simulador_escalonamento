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
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { PageFaultData } from '@/algoritmos/IPageFaultData';



const VELOCIDADES_PREDEFINIDAS = [1, 2, 5, 10]


function Execucao() {

  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [output,setOutput] = useState<number[][]>([[]])
  const [RAMvsTempo,setRAMvsTempo] = useState<(number|null)[][]>([]) 
  const [DiscovsTempo,setDiscovsTempo] = useState<(number|null)[][]>([])
  const [pageFaults,setPageFaults] = useState<(PageFaultData | null)[]>([])
  const [executar,setExecutar] = useState(false)
  const [velocidade, setVelocidade] = useState<number>(1)
  const [quantum,setQuantum] = useState<number>(0)
  const [sobrecarga,setSobrecarga] = useState<number>(0)
  const [turnaround,setTurnaround] = useState(0)
  const [algoritmoMemoria,setAlgoritmoMemoria] = useState<"FIFO" | "MRU">("FIFO")
  const [algoritmoProcessos,setAlgoritmoProcessos] = useState<"FIFO" | "SJF" | "EDF" | "RR">("FIFO")
  
  const handleVelocidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVelocidade(Number(e.target.value))
  }


  const handleExecutar = (param : boolean) => {
    setExecutar(param)
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
    if (processosSalvos) setProcessos(JSON.parse(processosSalvos));
  }, [executar]);


  useEffect(()=>{
    setOutput(getProcessosAlgoritmo(algoritmoProcessos).output)
    setTurnaround(getProcessosAlgoritmo(algoritmoProcessos).average_turnaround)
    setDiscovsTempo(getProcessosAlgoritmo(algoritmoProcessos).discoHistory)
    setRAMvsTempo(getProcessosAlgoritmo(algoritmoProcessos).ramHistory)
    setPageFaults(getProcessosAlgoritmo(algoritmoProcessos).pagefaults)
  },[algoritmoProcessos])
    

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
      <div className={`flex flex-col items-center justify-center w-full h-screen mx-auto ${output ? "pt-20" : ""} `}>
        <div className='flex flex-row w-full items-start pb-4'>
          <div className='flex flex-col w-full items-center gap-4 mx-4'>
            <AlgoritmoForm
            config={{sobrecarga,quantum,algoritmoProcessos,algoritmoMemoria}}
             setExecutar={handleExecutar}
             setAlgoritmoMemoria={setAlgoritmoMemoria}
             setAlgoritmoProcessos={setAlgoritmoProcessos}
             setQuantum={setQuantum}
             setSobrecarga={setSobrecarga}/>
            <div className='max-w-4xl'>
           {output && executar && turnaround && sobrecarga && quantum  && <EsteiraExecucao lista={output} turnaround={turnaround} velocidade={velocidade} />}
            </div>
            {executar && 
            <div className="flex items-center gap-4 sticky left-0">
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
          <div className='flex flex-col w-full items-center gap-4 mx-4'>
            
      {executar && output && RAMvsTempo && DiscovsTempo && <MemoriaCard RAMvsTempo={RAMvsTempo.slice(1)} DISCOvsTempo={DiscovsTempo.slice(1)} velocidade={velocidade}/>}
      {executar &&  output && turnaround && pageFaults &&
      <div className='w-full flex flex-row justify-evenly'>
      

      <Tabs defaultValue='processos' className='w-full'>
        <TabsList>
          <TabsTrigger value='processos'>Processos</TabsTrigger>
          <TabsTrigger value='pagefaults'>Page Faults</TabsTrigger>
        </TabsList>
        <TabsContent value='execucao'>
        </TabsContent>
        <TabsContent value='processos' className='flex flex-row flex-wrap gap-2'>
            {
              processos.map((item,index)=>(
              <Card className='border-border text-[#00FF00]'>
                <CardTitle className='text-center my-2'>
                  Processo {index + 1}
                  </CardTitle>
                <CardContent>
                  
                    <p>Tempo de chegada: <span className='text-white'>{item.chegada}</span> </p>
                    <p>Tempo necessário: <span className='text-white'>{item.tempo}</span> </p>
                    <p>Deadline: <span className='text-white'>{item.deadline}</span> </p>
                    <p>Tamanho: <span className='text-white'>{item.tamanho} páginas</span> </p>
                </CardContent>
              </Card>
              ))}
                </TabsContent>
                <TabsContent value='pagefaults'>
                  <Card className="border-border text-[#00FF00]">
                    <CardTitle className="text-center my-2 flex justify-start ml-4 pb-4">Page Faults</CardTitle>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#2A2A2A] border border-[#333333]">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 border border-[#333333]">Tempo (segundos)</th>
                              <th className="px-4 py-2 border border-[#333333]">Processo ID</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pageFaults
                              .filter((pf) => pf !== null && pf.page_fault === 1) // Filtra valores não nulos e page_fault === 1
                              .map((pf, index) => (
                                <tr key={index} className="hover:bg-[#333333]">
                                  <td className="px-4 py-2 border border-[#333333] text-center">{pf!.time}</td> {/* Usamos ! para garantir que pf não é null */}
                                  <td className="px-4 py-2 border border-[#333333] text-center">{pf!.id}</td> {/* Usamos ! para garantir que pf não é null */}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                </Tabs>
              </div>}
          </div>
        </div>
      </div>
  )
}

export default Execucao





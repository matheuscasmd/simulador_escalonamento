import { useEffect, useMemo, useState } from 'react';
import './App.css'
import AlgoritmoForm from './components/AlgoritmoForm';
import { EsteiraExecucao } from './components/EsteiraExecucao'
import { MemoriaCard } from './components/Memoria';
import { FIFOMemoryManager } from './algoritmos/memoria/fifo';
import { FIFOScheduler } from './algoritmos/processos/fifo';
import { IProcesso } from './algoritmos/IProcesso';
import { IEstado } from './algoritmos/IEstado';




function Execucao() {
  const memoryManager = useMemo(() => new FIFOMemoryManager(50), []);
  const [ram, setRam] = useState<number[]>(new Array(50).fill(null));
  const [disco, setDisco] = useState<number[]>(new Array(150).fill(null));
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [scheduler, setScheduler] = useState(new FIFOScheduler())
  const [estadosExecucao, setEstadosExecucao] = useState<IEstado[][]>(
    [["ausente","ausente","ausente","ausente"],["ausente","ausente","ausente","ausente"]]
  )

  useEffect(() => {
    const processosSalvos = localStorage.getItem("processos");
    if (processosSalvos) {
        const processosArray: IProcesso[] = JSON.parse(processosSalvos);
        setProcessos(processosArray);
    }
  }, []);

  useEffect(() => {
    let tempo = 0;
    const processosPendentes = [...processos];
    console.log(processos)
    const executarEscalonador = () => {
      while (processosPendentes.some(p => p.estado != "finalizado")) {
        const processosChegando = processosPendentes.filter(p => p.tempoChegada === tempo && p.estado != "finalizado");
        
        for (const processo of processosChegando) {
          if (memoryManager.alocarProcesso(processo)) {
            scheduler.adicionarProcesso(processo);
            processo.estado = "ram";
          } else {
            setDisco(discoAtual => {
              const novoDisco = [...discoAtual];
              const indicesLivres = novoDisco.map((v, i) => v === null ? i : null).filter(i => i !== null);
              if (indicesLivres.length >= processo.tamanho) {
                indicesLivres.slice(0, processo.tamanho).forEach(idx => novoDisco[idx] = processo.id);
              }
              processo.estado = "disco"
              tempo++;
              return novoDisco;
            });
          }
        }
  
        const finalizado = scheduler.executarPasso();
        if (finalizado) {
          memoryManager.liberarPaginas(finalizado);
          setRam(memoryManager.pages.slice() as number[]);
        }
        const estadosAtuais = scheduler.retornarEstados()
        setEstadosExecucao(estadosExecucao => 
          estadosExecucao.map((row, rowIndex) => 
            rowIndex === tempo ? estadosAtuais : row
          )
        );
        tempo++;
      }
    };
  
    executarEscalonador();
  }, [processos,estadosExecucao, disco, ram]);
  
  return (
      <div className='flex flex-col items-center justify-center w-full pr-80 pl-10'>
      <div className='flex flex-row w-full items-start pb-4 '>
      <AlgoritmoForm/>
      <MemoriaCard ram={ram} disco={disco}/>
      </div>
      <EsteiraExecucao lista={estadosExecucao}></EsteiraExecucao>
      </div>
  )
}

export default Execucao





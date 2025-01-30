import { useEffect, useMemo, useState } from 'react';
import './App.css'
import AlgoritmoForm from './components/AlgoritmoForm';
import { EsteiraExecucao } from './components/EsteiraExecucao'
import { MemoriaCard } from './components/Memoria';
import { FIFOMemoryManager } from './algoritmos/memoria/fifo';
import { FIFOScheduler } from './algoritmos/processos/fifo';
import { IProcesso } from './algoritmos/IProcesso';

type Estado = "ram" | "execucao" | "sobrecarga" | "disco" | "ausente" | "finalizado"
const estados: Estado[] = ["ram", "execucao", "sobrecarga", "disco", "ausente", "finalizado"];

const testeAleatorio: Estado[][] = 
  Array.from({ length: 4 }, () =>
    Array.from({ length: 100 }, () =>
      estados[Math.floor(Math.random() * estados.length)] // Gera um estado aleatório garantido do tipo Estado
    )
  )

function Execucao() {
  const memoryManager = useMemo(() => new FIFOMemoryManager(50), []);
  const [ram, setRam] = useState<number[]>(new Array(50).fill(null));
  const [disco, setDisco] = useState<number[]>(new Array(150).fill(null));
  const [processos, setProcessos] = useState<IProcesso[]>([]);

  useEffect(() => {
    const processosSalvos = localStorage.getItem("processos");
    if (processosSalvos) {
        const processosArray: IProcesso[] = JSON.parse(processosSalvos);
        setProcessos(processosArray);
    } else {

    }
  }, []);

  useEffect(() => {
    let tempo = 0;
    const scheduler = new FIFOScheduler(); // ou outro escolhido
    const processosPendentes = [...processos]; // Lista de processos a serem executados
  
    const executarEscalonador = () => {
      while (processosPendentes.some(p => !p.finalizado)) {
        const processosChegando = processosPendentes.filter(p => p.tempoChegada === tempo && !p.finalizado);
        
        for (const processo of processosChegando) {
          if (memoryManager.alocarProcesso(processo)) {
            scheduler.adicionarProcesso(processo);
          } else {
            // Processo não conseguiu espaço na RAM, mover para o disco
            setDisco(discoAtual => {
              const novoDisco = [...discoAtual];
              const indicesLivres = novoDisco.map((v, i) => v === null ? i : null).filter(i => i !== null);
              if (indicesLivres.length >= processo.tamanho) {
                indicesLivres.slice(0, processo.tamanho).forEach(idx => novoDisco[idx] = processo.id);
              }
              return novoDisco;
            });
          }
        }
  
        // Executa um passo do escalonador
        const finalizado = scheduler.executarPasso();
        if (finalizado) {
          memoryManager.liberarPaginas(finalizado);
          setRam(memoryManager.pages.slice() || []); // Atualiza estado da RAM
        }
  
        tempo++;
      }
    };
  
    executarEscalonador();
  }, []);
  
  return (
      <div className='flex flex-col items-center justify-center w-full pr-80 pl-10'>
      <div className='flex flex-row w-full items-start pb-4 '>
      <AlgoritmoForm/>
      <MemoriaCard ram={ram} disco={disco}/>
      </div>
      <EsteiraExecucao lista={testeAleatorio}></EsteiraExecucao>
      </div>
  )
}

export default Execucao





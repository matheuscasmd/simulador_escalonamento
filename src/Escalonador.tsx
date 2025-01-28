import { useEffect, useState } from "react";
import { Card } from "./components/ui/card";

type algoritmoProcessos = "FIFO" | "SJF" | "RR" | "EDF";
type algoritmoPaginas = "FIFO" | "LRU";

interface Processo {
  id: number;
  tempoChegada: number;
  tempoCompletar: number;
  tamanho: number;
  deadline: number;
  posicaoInicialRAM?: number;
}

interface Celula {
  processoId?: number;
  estado: "livre" | "sobrecarga" | "execucao" | "espera" | "disco";
}

type EscalonadorProps = {
  processos: Processo[];
  algoritmoProcessos: algoritmoProcessos;
  algoritmoPaginas: algoritmoPaginas;
};

export const Escalonador = ({
  processos,
  algoritmoProcessos,
  algoritmoPaginas,
}: EscalonadorProps) => {
  const [RAM, setRAM] = useState<Celula[]>(alocarMemoria(50));
  const [disco, setDisco] = useState<Celula[]>(alocarMemoria(200));
  const [processosRAM, setProcessosRAM] = useState<Processo[]>([]);
  const [prioridadePreemptivo,setPrioridadePreemptivo] = useState();
  const [paginasLivres,setPaginasLivres] =  useState(50)

  function alocarMemoria(tamanho: number): Celula[] {
    return Array.from({ length: tamanho }, () => ({
      estado: "livre",
    }));
  }
  function verificarProcessoCabeDisco(processo: Processo) {
  }
  function alocarDiscoFIFO(processo: Processo) { 
  }
  
  function verificarProcessoCabeRAM(processo: Processo) {
    for (let i = 0; i < RAM.length; i++) {
      if (RAM[i].estado === "livre" && i + processo.tamanho <= 50) {
        return i; 
      }
    }
    return false;
  }

  function moverProcessoDisco(processo: Processo){
    if(processo.posicaoInicialRAM){
      for(let i = processo.posicaoInicialRAM; i <processo.posicaoInicialRAM + processo.tamanho; i++){
        RAM[i] = {estado : "livre", processoId : undefined}
      }
    }
    
  }
  

  function alocarRAMFIFO(processo: Processo) {
    const posicao = verificarProcessoCabeRAM(processo);
    if (posicao !== false) {
      for (let i = posicao; i < posicao + processo.tamanho; i++) {
        RAM[i] = { estado: "execucao", processoId: processo.id };
      }
      setProcessosRAM((prev) => [...prev, { ...processo, posicaoInicialRAM: posicao }]);

    } else {
        const RAMLivre = RAM.every(celula => celula.estado === "livre");
        if (!RAMLivre) {
            // FIFO
            const processoMaisAntigo = processosRAM[0];
            for (let i = processoMaisAntigo.posicaoInicialRAM || 0; i < (processoMaisAntigo.posicaoInicialRAM || 0) + processoMaisAntigo.tamanho; i++) {
            RAM[i] = { estado: "livre", processoId : undefined };
            }
            // Atualizar processosRAM
            setProcessosRAM((prev) => prev.filter((p) => p.id !== processoMaisAntigo.id));
            // Tentar alocar novamente após remoção
            alocarRAMFIFO(processo);
        } else {
            // O processo tem mais páginas que a RAM
            console.log("O processo não cabe na RAM. Possui" + (processo.tamanho - RAM.length) + " páginas a mais do que a RAM.");
        }
    }
}


  function escalonarProcessos() {
    switch (algoritmoProcessos) {
      case "FIFO":
        break;
      case "EDF":
        break;
      case "RR":
        break;
      case "SJF":
        break;
      default:
        break;
    }
  }

  function escalonarPaginas() {
    // Aqui irá chamar escalonarProcessos()
    switch (algoritmoPaginas) {
      case "FIFO":
        break;
      case "LRU":
        break;
      default:
        break;
    }
  }

  // Lógica de renderização
  return (
    <Card className="bg-sidebar z-30 backdrop-brightness-0 text-white border-gray-800/85">
      <h1>Simulação de Memória e Escalonamento de Processos</h1>
      <h2>RAM (50 Páginas)</h2>
      <table className="tabela-memoria bg-white">
        <thead>
          <tr>
            <th>Página</th>
            <th>Estado</th>
            <th>Processo</th>
          </tr>
        </thead>
        <tbody className="flex flex-row gap-4 flex-wrap max-w-4xl">
          {RAM.map((celula, index) => (
            <tr key={index} className="flex flex-col">
              <td>{index + 1}</td>
              <td>{celula.estado}</td>
              <td>{celula.processoId ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => escalonarProcessos()}>Escalonar Processos</button>
      <button onClick={() => escalonarPaginas()}>Escalonar Páginas</button>
    </Card>
  );
};

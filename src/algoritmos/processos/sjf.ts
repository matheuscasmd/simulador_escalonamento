import { IProcesso } from "../IProcesso";
import { FIFOMemoryManager } from "../memoria/fifo";

export function sjf(processes_input: IProcesso[], memoria : "FIFO" | "MRU"): { output: number[][], average_turnaround: number,ramHistory:(number|null)[][],discoHistory:(number|null)[][] } {
  let processes = processes_input.map(p => ({ ...p })).sort((a, b) => a.chegada - b.chegada);
  let n = processes.length;
  let completed = 0;
  let current_time = 0;
  let totalTurnaroundTime = 0;

  let completedProcesses: IProcesso[] = [];
  let memoryManager = new FIFOMemoryManager(50, 150, processes);

  while (completed < n) {
      let ready = processes.filter(p => p.chegada <= current_time && !p.finalizado);
      if (ready.length > 0) {
          ready.sort((a, b) => a.tempo - b.tempo);
          let actuallP = ready[0];
          let wait: number = 0;
          let turnaround: number = 0;


          memoryManager.alocarProcessoRAM(actuallP);

          current_time += actuallP.tempo;
          wait = current_time - actuallP.chegada - actuallP.tempo;
          turnaround = current_time - actuallP.chegada;

          totalTurnaroundTime += turnaround;

          actuallP.finalizado = true;
          actuallP.tempoEspera = wait;
          actuallP.turnaround = turnaround;

          completedProcesses.push(actuallP);
          for(let i = 0;i<actuallP.tempo-1;i++){
              //console.log(actuallP.tempo,actuallP.id);
              memoryManager.copiarEstado();
          }
          completed++;
      } else {
          memoryManager.copiarEstado();
          current_time++;
      }
  }

  let output: number[][] = [];
  for (let i = 0; i < completedProcesses.length; i++) {
      output[i] = [];
  }
  let count: number = 0;
  completedProcesses = completedProcesses.map(p => ({ ...p })).sort((a, b) => a.id - b.id);

  completedProcesses.forEach(process => {
      for (let i = 0; i < current_time; i++) {
          if (i < process.chegada) {
              output[count][i] = 5;
          } else if (i < process.tempoEspera + process.chegada) {
              output[count][i] = 3;
          } else if (i < process.tempo + process.tempoEspera + process.chegada) {
              output[count][i] = 1;
          } else {
              output[count][i] = 5;
          }
      }
      count++;
  });

 

  let average_turnaround = totalTurnaroundTime / n;
  return { output, average_turnaround,ramHistory: memoryManager.RAMvsTempo, discoHistory: memoryManager.DISCOvsTempo };
}
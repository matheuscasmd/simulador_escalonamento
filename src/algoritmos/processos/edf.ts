import { IProcesso } from "../IProcesso";
import { FIFOMemoryManager } from "../memoria/fifo";

export function edf(processes_input: IProcesso[], quantum: number, preemptive: number): { output: number[][], average_turnaround: number, ramHistory: (number|null)[][], discoHistory: (number|null)[][] } {
  let processes = processes_input.map(p => ({ ...p })).sort((a, b) => a.chegada - b.chegada);
  let n = processes.length;
  let current_time = 0;
  let totalTurnaroundTime = 0;
  let completedProcesses: IProcesso[] = [];
  let counter: number = 0;
  let readyQueue: number[] = [];
  let output: number[][] = Array.from({ length: n }, () => Array(10000).fill(-1));
  let memoryManager = new FIFOMemoryManager(50, 150, processes);

  while (counter < n && processes[counter].chegada <= current_time) {
      readyQueue.push(counter);
      counter++;
  }

  while (completedProcesses.length < n) {
      if (readyQueue.length === 0) {
          current_time++;
          while (counter < n && processes[counter].chegada <= current_time) {
              readyQueue.push(counter);
              counter++;
          }
          continue;
      }
      
      readyQueue.sort((a, b) => (processes[a].deadline + processes[a].chegada) - (processes[b].deadline + processes[b].chegada));
      let i = readyQueue.shift()!;

      if (!processes[i].finalizado) {
          memoryManager.alocarProcessoRAM(processes[i]);
          let executionTime = Math.min(processes[i].tempo, quantum);
          for (let t = current_time; t < current_time + executionTime; t++) {
              output[i][t] = (t >= processes[i].chegada + processes[i].deadline) ? 4 : 1;
          }
          current_time += executionTime;
          processes[i].tempo -= executionTime;

          if (processes[i].tempo === 0) {
              processes[i].finalizado = true;
              completedProcesses.push(processes[i]);
              totalTurnaroundTime += current_time - processes[i].chegada;
              for (let j = 0; j < executionTime - 1; j++) {
                  memoryManager.copiarEstado();
              }
          } else {
              for (let t = current_time; t < current_time + preemptive; t++) {
                  output[i][t] = 2;
              }
              current_time += preemptive;
              readyQueue.push(i);
              for (let j = 0; j < preemptive + executionTime - 1; j++) {
                  memoryManager.copiarEstado();
              }
          }
          
        
      }

      while (counter < n && processes[counter].chegada <= current_time) {
          readyQueue.push(counter);
          counter++;
      }
  }

  for (let j = 0; j < n; j++) {
      for (let t = 0; t < processes[j].chegada; t++) {
          if (output[j][t] === -1) {
              output[j][t] = 5;
          }
      }
      for (let t = processes[j].chegada; t < current_time; t++) {
          if (output[j][t] === -1) {
              output[j][t] = 3;
          }
      }
  }

  for (let j = 0; j < n; j++) {
      let a = current_time - 1;
      while (output[j][a] !== 1 && output[j][a] !== 4) {
          output[j][a] = 5;
          a--;
      }
  }

  output = output.map(row => row.filter(cell => cell !== -1));
  const orderedOutput: number[][] = new Array(n);
  for (let i = 0; i < n; i++) {
      orderedOutput[processes[i].id] = output[i];
  }

  let average_turnaround = totalTurnaroundTime / n;
  output = orderedOutput;
  return { output, average_turnaround, ramHistory: memoryManager.RAMvsTempo, discoHistory: memoryManager.DISCOvsTempo };
}
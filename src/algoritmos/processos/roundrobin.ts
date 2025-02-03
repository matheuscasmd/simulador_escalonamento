import { PageFaultData } from "../IPageFaultData";
import { IProcesso } from "../IProcesso";
import { FIFOMemoryManager } from "../memoria/fifo";

export function rr(processes_input: IProcesso[], quantum: number, preemptive: number): { output: number[][], average_turnaround: number,ramHistory:(number|null)[][],discoHistory:(number|null)[][],pagefaults:(PageFaultData | null)[]  } {
    let processes = processes_input.map(p => ({ ...p })).sort((a, b) => a.chegada - b.chegada);

    let n = processes.length;
    let current_time = 0;
    let totalTurnaroundTime = 0;
    let completedProcesses: IProcesso[] = [];
    let counter: number = 0;

    let readyQueue: number[] = [];
    let output: number[][] = [];
    let memoryManager;
    memoryManager = new FIFOMemoryManager(50,150,processes)
    
   

    output = Array.from({ length: n }, () => Array(10000).fill(-1));

    while (counter < n && processes[counter].chegada <= current_time) {
        readyQueue.push(counter);
        counter++;
    }

    while (completedProcesses.length < n) {
        if (readyQueue.length === 0) {
            current_time++;
            memoryManager.copiarEstado();
            while (counter < n && processes[counter].chegada <= current_time) {
                readyQueue.push(counter);
                counter++;

            }
            continue;
        }

        let i = readyQueue.shift()!;
       
        if (!processes[i].finalizado) {
            
            if (processes[i].tempo <= quantum && processes[i].tempo > 0) {
                memoryManager.alocarProcessoRAM(processes[i]);  
                
                
                for (let t = current_time; t < current_time + processes[i].tempo; t++) {
                    output[i][t] = 1;
                }
                current_time += processes[i].tempo;
                
                let pTime = processes[i].tempo;

                processes[i].tempo = 0;
                processes[i].finalizado = true;
                completedProcesses.push(processes[i]);
                totalTurnaroundTime += current_time - processes[i].chegada;
                for(let j = 0; j < pTime-1 ; j++) {
                   
                    memoryManager.copiarEstado();
                }
            } else if (processes[i].tempo > 0) {
                memoryManager.alocarProcessoRAM(processes[i]);  
                for (let t = current_time; t < current_time + quantum; t++) {
                    output[i][t] = 1;
                }
                processes[i].tempo -= quantum;
                current_time += quantum;
                let preemptiveArrivalDetected = false;
                for (let t = current_time; t < current_time + preemptive; t++) {
                    output[i][t] = 2;
                    while (counter < n && processes[counter].chegada <= t) {
                        readyQueue.push(counter);
                        counter++;
                        preemptiveArrivalDetected = true;
                    }
                }
                current_time += preemptive;
                if(!preemptiveArrivalDetected){
                    readyQueue.push(i);
                }
                for(let i = 0; i < quantum+preemptive - 1; i++) {
                    memoryManager.copiarEstado();
                }
            }
        }

        while (counter < n && processes[counter].chegada <= current_time) {
            readyQueue.push(counter);
            counter++;
        }

        if (processes[i].tempo > 0) {
            readyQueue.push(i);
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
        while (output[j][a] !== 1) {
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
    
    return { output, average_turnaround,ramHistory: memoryManager.RAMvsTempo, discoHistory: memoryManager.DISCOvsTempo,pagefaults:memoryManager.pageFaultvsTempo};
}
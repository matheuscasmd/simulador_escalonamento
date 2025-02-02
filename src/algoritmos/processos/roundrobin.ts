import { IProcesso } from "../IProcesso";
import { FIFOMemoryManager } from "../memoria/fifo";
import { MRUMemoryManager } from "../memoria/mru";

export function rr(processes_input: IProcesso[], quantum: number, preemptive: number, memoria : "FIFO" | "MRU"): { output: number[][], average_turnaround: number,ramHistory:(number|null)[][],discoHistory:(number|null)[][] } {
    let processes = processes_input.map(p => ({ ...p })).sort((a, b) => a.chegada - b.chegada);

    let n = processes.length;
    let current_time = 0;
    let totalTurnaroundTime = 0;
    let completedProcesses: IProcesso[] = [];
    let counter: number = 0;

    let readyQueue: number[] = [];
    let output: number[][] = [];
    let memoryManager;
    if(memoria === "FIFO"){
        memoryManager = new FIFOMemoryManager(50,150,processes)
    }
    else {
        memoryManager = new MRUMemoryManager(50,150,processes)
    }
  
   

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
        let process = processes[i];

        if (!process.finalizado) {
            memoryManager.alocarProcessoRAM(process);
            let executionTime = Math.min(process.tempo, quantum);
            
            for (let t = current_time; t < current_time + executionTime; t++) {
                output[i][t] = 1;
            }
            process.tempo -= executionTime;
            current_time += executionTime;

            if (process.tempo === 0) {
                process.finalizado = true;
                completedProcesses.push(process);
                totalTurnaroundTime += current_time - process.chegada;
            } else {
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
                
                if (preemptiveArrivalDetected) {
                    console.log("Outro processo chegou durante a preempção em:", current_time);
                }
                readyQueue.push(i);
            }
            memoryManager.copiarEstado();
        }

        while (counter < n && processes[counter].chegada <= current_time) {
            readyQueue.push(counter);
            counter++;
        }
    }

    for (let j = 0; j < n; j++) {
        for (let t = 0; t < processes[j].chegada; t++) {
            if (output[j][t] === -1) output[j][t] = 5;
        }
        for (let t = processes[j].chegada; t < current_time; t++) {
            if (output[j][t] === -1) output[j][t] = 3;
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

    return { output: orderedOutput, average_turnaround: totalTurnaroundTime / n, ramHistory: memoryManager.RAMvsTempo, discoHistory: memoryManager.DISCOvsTempo };
}

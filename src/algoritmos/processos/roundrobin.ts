import { IProcesso } from "../IProcesso";


function Round_Robin(IProcessoes_input:IProcesso[],quantum:number,preemptive:number){
    let IProcessoes = IProcessoes_input.map(p => ({ ...p }));
    let n = IProcessoes.length;
    let current_tempo = 0;
    let totalTurnaroundtempo = 0;
    let finalizadoIProcessoes: IProcesso[] = [];
    let counter:number = 0;
    
    let readyQueue: number[] = [];
    let output:number[][] = [];
    
    output = Array.from({ length: n }, () => Array(Infinity).fill(-1));
    
    while (counter < n && IProcessoes[counter].tempoChegada <= current_tempo) {
        readyQueue.push(counter);
        counter++;
    }
    
    
    while(finalizadoIProcessoes.length < n){
      let i = readyQueue.shift();
       if(i === undefined){
          break;
       }
      if(!IProcessoes[i].finalizado){
        if(IProcessoes[i].tempo <= quantum && IProcessoes[i].tempo > 0){
            for (let t = current_tempo; t < current_tempo + IProcessoes[i].tempo; t++) {
                output[i][t] = 1; 
            }
            current_tempo += IProcessoes[i].tempo;
    
            IProcessoes[i].tempo = 0;
            IProcessoes[i].finalizado = true;
            finalizadoIProcessoes.push(IProcessoes[i]);
            totalTurnaroundtempo += current_tempo - IProcessoes[i].tempoChegada; 
        }
        else if(IProcessoes[i].tempo > 0){
            for (let t = current_tempo; t < current_tempo + quantum; t++) {
                output[i][t] = 1;
            }
            IProcessoes[i].tempo -= quantum;
            current_tempo +=quantum;
            for (let t = current_tempo; t < current_tempo + preemptive; t++) {
                output[i][t] = 2; 
            }
            current_tempo += preemptive;
    
            
        }
     }
     while (counter < n && IProcessoes[counter].tempoChegada <= current_tempo) {
        readyQueue.push(counter);
        counter++;
    }
    if(IProcessoes[i].tempo> 0) {
        readyQueue.push(i);
    }
    
     for (let j = 0; j < n; j++) {
            for (let t = IProcessoes[j].tempo; t < current_tempo; t++) {
            if(output[j][t] === -1){
                output[j][t] = 5;
             }
        }
    }
    }
    output = output.map(row => row.filter(cell => cell !== -1));
    for (let i = 0; i < output.length; i++) {
    console.log(Index ${i}: [${output[i].join(", ")}]);
    }
    console.log("Average Turnaround tempo: " + (totalTurnaroundtempo / n).toFixed(2));
    
    }
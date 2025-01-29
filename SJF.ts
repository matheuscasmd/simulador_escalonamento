function sjf(processes:Process[]):number[][] {
    let n = processes.length;
    let completed = 0;
    let current_time = 0;
    let totalTurnaroundTime = 0;

    let completedProcesses: Process[] = [];
    while(completed < n){
        let ready = processes.filter(p => p.arrival <= current_time && !p.completed);
        if(ready.length > 0){
            ready.sort((a,b) => a.time - b.time);
            let actuallP = ready[0];
            let wait:number = 0;
            let turnaround:number = 0;
            current_time += actuallP.time;
            wait = current_time - actuallP.arrival - actuallP.time;
            turnaround = current_time - actuallP.arrival;

            totalTurnaroundTime += turnaround;

            actuallP.completed = true;
            actuallP.waitingTime = wait;
            actuallP.turnaround= turnaround;

            completedProcesses.push(actuallP);

            completed++;
        }
        else{
            current_time++;
        }
    }

    completedProcesses.sort((a,b) => a.id - b.id);

    let output: number[][] = Array.from({ length: completedProcesses.length }, () => []);
    let count:number = 0;
    completedProcesses.forEach(process => {
       
       for(let i = 0;i<current_time;i++){
         if(i < process.arrival){
            output[count][i] = 5;
         }
         else if(i<process.waitingTime+process.arrival){
            output[count][i] = 3;
         }
         else if(i<process.time+process.waitingTime+process.arrival){
            output[count][i] = 1;
         }
         else{
            output[count][i] = 5;
         }
       }
       count++;
    });
    for (let i = 0; i < output.length; i++) {
        console.log(`Index ${i}: [${output[i].join(", ")}]`);
    }
    console.log("Average Turnaround Time: " + (totalTurnaroundTime / n).toFixed(2));

   return output;
}

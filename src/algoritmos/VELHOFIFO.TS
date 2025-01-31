interface Process {
    arrival: number;
    time: number;
    completed: boolean;
    waitingTime: number;
    deadline?: number;
    turnaround?: number;
}

function fifo(processes_input: Process[]): { output: number[][], average_turnaround: number } {
    let processes = processes_input.map(p => ({ ...p }));
    let n = processes.length;
    let completed = 0;
    let current_time = 0;
    let totalTurnaroundTime = 0;

    let completedProcesses: Process[] = [];

    processes.sort((a, b) => a.arrival - b.arrival);

    while (completed < n) {
        let ready = processes.filter(p => p.arrival <= current_time && !p.completed);

        if (ready.length > 0) {
            let actuallP = ready[0];
            let wait: number = 0;
            let turnaround: number = 0;

            current_time += actuallP.time;

            wait = current_time - actuallP.arrival - actuallP.time;
            turnaround = current_time - actuallP.arrival;

            totalTurnaroundTime += turnaround;

            actuallP.completed = true;
            actuallP.waitingTime = wait;
            actuallP.turnaround = turnaround;

            completedProcesses.push(actuallP);

            completed++;
        } else {
            current_time++;
        }
    }

    let output: number[][] = [];
    for (let i = 0; i < completedProcesses.length; i++) {
        output[i] = [];
    }

    let count: number = 0;
    completedProcesses.forEach(process => {
        for (let i = 0; i < current_time; i++) {
            if (i < process.arrival) {
                output[count][i] = 5;
            } else if (i < process.waitingTime + process.arrival) {
                output[count][i] = 3;
            } else if (i < process.time + process.waitingTime + process.arrival) {
                output[count][i] = 1;
            } else {
                output[count][i] = 5;
            }
        }
        count++;
    });

    let average_turnaround = totalTurnaroundTime / n

    return { output, average_turnaround };
}


const tempoTotal = 1000  //mil segundos

type info  = 0 | 1 | 2 | 3


type infoCores = {
    execucao : 1
    sobrecarga : 2
    fila : 3
    starvation : 4
    ausente : 5
}


function marcarTemposProcesso ( instantesExecucao : number[], instantesSobrecarga : number[]){
    let tempos = new Array<info>(tempoTotal).fill(3)
    instantesExecucao.forEach((value)=> {
        tempos[value] = 0
        tempos[value+1] = 0
    })
    instantesSobrecarga.forEach((value)=> {
        tempos[value] = 2
    })
}


















interface ProcessoRR {
    tempoChegada : number,
    tempoExecutar : number,
    deadline : number
}
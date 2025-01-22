type algoritmoMemoria = "FIFO" | "SJF" | "RR" | "EDF"
type algoritmoPaginas = "FIFO" | "LRU"

interface Processo {
    id : number
    tempoCompletar : number
    deadline : number
    
}
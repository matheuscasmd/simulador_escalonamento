import { useEffect, useState } from "react"

type algoritmoProcessos = "FIFO" | "SJF" | "RR" | "EDF"
type algoritmoPaginas = "FIFO" | "LRU"

interface Processo {
    id : number
    tempoChegada : number
    tempoCompletar : number
    tamanho : number
    deadline : number
    posicaoInicialRAM?: number
}

interface Celula {
    processoId? : number
    estado : "livre" | "sobrecarga" | "execucao" | "espera"
}

type EscalonadorProps = {
    processos : Processo[]
    algoritmoProcessos : algoritmoProcessos
    algoritmoPaginas : algoritmoPaginas
}

export const Escalonador = ({processos,algoritmoProcessos,algoritmoPaginas}: EscalonadorProps) => {
    const [RAM, setRAM] = useState<Celula[]>(alocarMemoria(50));
    const [disco, setDisco] = useState<Celula[]>(alocarMemoria(200));
    const [processosRAM, setProcessosRAM] = useState<Processo[]>([]);

    function alocarMemoria(tamanho: number): Celula[] {
        return Array.from({ length: tamanho }, () => ({
        estado: "livre",
        }));
    }
    function getUltimaPosicaoLivreRAM(){
        let posicao = -1; // pra resolver 0 based index
        processosRAM.forEach((item)=>{
            if(item.posicaoInicialRAM){
                posicao += (item.posicaoInicialRAM  + item.tamanho)
            }
        })
        return posicao === -1 ? 0 : posicao
    }
    function verificarProcessoCabeRAM(processo : Processo){
        const posicao = getUltimaPosicaoLivreRAM()
        if(posicao + processo.tamanho >= 49){
            return posicao
        }
        return false
    }
    function alocarRAMFIFO(processo : Processo){
        const alocacao = verificarProcessoCabeRAM(processo)
        if(alocacao != false){
            //retirar o primeiro processo do aarray processosRAM, pegar a sua posicao inicial
            //chamar a funcao novamente com recursao e caso contrario sair removendo processos seguintes ate que consiga caber, ou parar caso a ram esteja vazia
        }
    }
    function alocarRAMLRU(processo : Processo){

    }
    function escalonarProcessosPaginaFIFO(){
        switch(algoritmoProcessos){
            case "FIFO":
                break
            case "EDF":
                break
            case "RR":
                break
            case "SJF":
                break
        }
    }
    function escalonarProcessosPaginaLRU(algoritmoProcessos : algoritmoProcessos, processos : Processo[]){
        switch(algoritmoProcessos){
            case "FIFO":
                break
            case "EDF":
                break
            case "RR":
                break
            case "SJF":
                break
        }
    }
    return (

    )
}

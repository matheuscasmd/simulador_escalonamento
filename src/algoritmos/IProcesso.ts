export interface IProcesso {
    id: number;
    tempoChegada: number;
    tempo: number;
    tamanho: number;
    finalizado: boolean;
    deadline : number
    posicaoInicialRAM?: number;
    paginasAlocadas: number[]; // Páginas alocadas na RAM
  }
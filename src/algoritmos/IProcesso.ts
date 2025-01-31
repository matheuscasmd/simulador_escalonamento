import { IEstado } from "./IEstado";

export interface IProcesso {
    id: number;
    tempoChegada: number;
    tempo: number;
    tamanho: number;
    deadline : number
    posicaoInicialRAM?: number;
    paginasAlocadas: number[]; // Páginas alocadas na RAM
    estado : IEstado
  }
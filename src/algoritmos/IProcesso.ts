export interface IProcesso {
  id: number;
  chegada: number;
  tempo: number;
  tempoEspera: number;
  tamanho: number;
  deadline?: number;
  finalizado: boolean;
  memoria?: "ram" | "disco";
  turnaround?: number;
  indicePaginasAlocadas?: number[];
}
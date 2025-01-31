import { IProcesso } from "../IProcesso";

export class SJFScheduler {
  public fila: IProcesso[] = [];
  public processoAtual: IProcesso | null = null;
  
    adicionarProcesso(processo: IProcesso) {
      this.fila.push(processo);
      this.fila.sort((a, b) => a.tempo - b.tempo);
    }
  
    executarPasso(): IProcesso | null {
      if (!this.processoAtual && this.fila.length > 0) {
        this.processoAtual = this.fila.shift()!;
      }
      if (this.processoAtual) {
        this.processoAtual.tempo--;
        if (this.processoAtual.tempo <= 0) {
          const finalizado = this.processoAtual;
          this.processoAtual.estado = "finalizado";
          this.processoAtual = null;
          return finalizado;
        }
      }
      return null;
    }
}
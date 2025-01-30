import { IProcesso } from "../IProcesso";

export class EDFScheduler {
    private fila: IProcesso[] = [];
    private processoAtual: IProcesso | null = null;
  
    adicionarProcesso(processo: IProcesso) {
      this.fila.push(processo);
      this.fila.sort((a, b) => (a.deadline || Infinity) - (b.deadline || Infinity));
    }
  
    executarPasso(): IProcesso | null {
      if (!this.processoAtual && this.fila.length > 0) {
        this.processoAtual = this.fila.shift()!;
      }
      if (this.processoAtual) {
        this.processoAtual.tempo--;
        if (this.processoAtual.tempo <= 0) {
          const finalizado = this.processoAtual;
          finalizado.finalizado = true;
          this.processoAtual = null;
          return finalizado;
        }
      }
      return null;
    }
}
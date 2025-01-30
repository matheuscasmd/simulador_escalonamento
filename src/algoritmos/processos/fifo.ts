import { IProcesso } from "../IProcesso";

export class FIFOScheduler {
    private fila: IProcesso[] = [];
    private IProcessoAtual: IProcesso | null = null;
  
    adicionarProcesso(IProcesso: IProcesso) {
      this.fila.push(IProcesso);
    }
  
    executarPasso(): IProcesso | null {
      if (!this.IProcessoAtual && this.fila.length > 0) {
        this.IProcessoAtual = this.fila.shift()!;
      }
      if (this.IProcessoAtual) {
        this.IProcessoAtual.tempo--;
        if (this.IProcessoAtual.tempo <= 0) {
          const finalizado = this.IProcessoAtual;
          finalizado.finalizado = true;
          this.IProcessoAtual = null;
          return finalizado;
        }
      }
      return null;
    }
  }
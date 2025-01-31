import { IEstado } from "../IEstado";
import { IProcesso } from "../IProcesso";

export class FIFOScheduler {
    public fila: IProcesso[] = [];
    public IProcessoAtual: IProcesso | null = null;
    public input: IProcesso[] = [];
  
    adicionarProcesso(IProcesso: IProcesso) {
      this.fila.push(IProcesso);
      this.input.push(IProcesso);
    }
  
    executarPasso(): IProcesso | null {
      if (!this.IProcessoAtual && this.fila.length > 0) {
        this.IProcessoAtual = this.fila.shift()!;
        this.IProcessoAtual.estado = "execucao";
      }
      if (this.IProcessoAtual) {
        this.IProcessoAtual.tempo--;
        if (this.IProcessoAtual.tempo <= 0) {
          const finalizado = this.IProcessoAtual;
          this.IProcessoAtual.estado = "finalizado";
          this.IProcessoAtual = null;
          return finalizado;
        }
      }
      return null;
    }
    retornarEstados(): IEstado[] {
      const estadosAtuais: IEstado[] = [];

      if (this.IProcessoAtual) {
          estadosAtuais.push(this.IProcessoAtual.estado);
      }

      this.input.forEach(processo => {
          estadosAtuais.push(processo.estado);
      });

      return estadosAtuais;
  }
}

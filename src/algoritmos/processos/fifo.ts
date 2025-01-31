import { IEstado } from "../IEstado";
import { IProcesso } from "../IProcesso";

export class FIFOScheduler {
    public fila: IProcesso[] = [];
    public IProcessoAtual: IProcesso | null = null;
  
    adicionarProcesso(IProcesso: IProcesso) {
      this.fila.push(IProcesso);
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

    this.fila.forEach(processo => {
        estadosAtuais.push(processo.estado);
    });

    // Ordena os estados com base na propriedade 'chegada' de cada processo
    const processosChegada = estadosAtuais.sort((a, b) => a.processo.chegada - b.processo.chegada);

    return estadosAtuais;
}
}

import { IProcesso } from "../IProcesso";

export class RoundRobinScheduler {
    public fila: IProcesso[] = [];
    public IProcessoAtual: IProcesso | null = null;
    public quantumRestante: number = 0;
    public quantum: number;
    public sobrecarga: number;

    constructor(quantum: number, sobrecarga: number) {
        this.quantum = quantum;
        this.sobrecarga = sobrecarga;
    }

    adicionarProcesso(IProcesso: IProcesso) {
        this.fila.push({ ...IProcesso });
    }

    executarPasso(): IProcesso | null {
        if (!this.IProcessoAtual && this.fila.length > 0) {
            this.IProcessoAtual = this.fila.shift()!;
            this.quantumRestante = this.quantum;
        }

        if (this.IProcessoAtual) {
            this.IProcessoAtual.tempo--;
            this.quantumRestante--;

            if (this.IProcessoAtual.tempo <= 0) {
                const finalizado = this.IProcessoAtual;
                this.IProcessoAtual.estado =  'finalizado';
                this.IProcessoAtual = null;
                return finalizado;
            }

            if (this.quantumRestante <= 0) {
                this.fila.push(this.IProcessoAtual);
                this.IProcessoAtual = null;
            }
        }

        return null;
    }
}

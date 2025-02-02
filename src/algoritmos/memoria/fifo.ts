import { IProcesso } from "../IProcesso";

export class FIFOMemoryManager {
  public discSize: number;
  public discArray: (number | null)[];
  public freeDiscPages: number[];
  public RAMSize: number;
  public RAMArray: (number | null)[];
  public freeRAMPages: number[];
  public paginasOcupadas: number[];
  public processInput: IProcesso[];
  public pageFaults: number;
  public RAMvsTempo: (number | null)[][];
  public DISCOvsTempo: (number | null)[][];
  public tempo: number;
  private filaRAM: IProcesso[] = [];

  constructor(ramSize: number, discSize: number, processos: IProcesso[]) {
    this.RAMSize = ramSize;
    this.RAMArray = new Array(ramSize).fill(null);
    this.freeRAMPages = Array.from({ length: ramSize }, (_, i) => i);

    this.discSize = discSize;
    this.discArray = new Array(discSize).fill(null);
    this.freeDiscPages = Array.from({ length: discSize }, (_, i) => i);

    this.paginasOcupadas = [];
    this.processInput = processos;
    this.pageFaults = 0;
    this.tempo = 1;
    this.RAMvsTempo = [];
    this.DISCOvsTempo = [];
    this.alocarDiscoTudo(processos);
    this.RAMvsTempo.push([...this.RAMArray]); // Inicializa a RAM vazia
  }

  private registrarEstadoRAM(): void {
    this.RAMvsTempo.push([...this.RAMArray]);
  }

  private registrarEstadoDISCO(): void {
    this.DISCOvsTempo.push([...this.discArray]);
  }

  public alocarProcessoRAM(processo: IProcesso): void {
    if (!processo || processo.memoria !== "disco") {
      this.registrarEstadoRAM();
      this.registrarEstadoDISCO();
      return};
    
    if (this.freeRAMPages.length >= processo.tamanho) {
      this.tempo++;
      this.filaRAM.push(processo);
      processo.indicePaginasAlocadas = [];

      for (let i = 0; i < processo.tamanho; i++) {
        const pagina = this.freeRAMPages.shift()!;
        this.RAMArray[pagina] = processo.id;
        processo.indicePaginasAlocadas.push(pagina);
      }
      
      this.liberarDisco(processo);
      processo.memoria = "ram";
      //console.log(processo.id);

      this.registrarEstadoRAM();
      this.registrarEstadoDISCO();
    } else {
      this.pageFaults++;
      
        this.liberarProcessoRAM();
        this.alocarProcessoRAM(processo);
      
    }
  }

  private liberarProcessoRAM(): void {
    if (this.filaRAM.length === 0) return;
    const processoAntigo = this.filaRAM.shift()!;

    if (this.freeDiscPages.length >= processoAntigo.tamanho) {
      this.moverRAMparaDISCO(processoAntigo);
    }
  }

  private moverRAMparaDISCO(processo: IProcesso): void {
    if (this.freeDiscPages.length < processo.tamanho) return;

    processo.indicePaginasAlocadas?.forEach((pagina) => {
      if (this.RAMArray[pagina] !== null) {
        const discIndex = this.freeDiscPages.shift()!;
        this.discArray[discIndex] = this.RAMArray[pagina];
        this.RAMArray[pagina] = null;
        this.freeRAMPages.push(pagina);
      }
    });
    this.freeRAMPages.sort((a, b) => a - b);
    processo.memoria = "disco";
    processo.indicePaginasAlocadas = [];
  }

  private liberarDisco(processo: IProcesso): void {
    for (let i = 0; i < this.discArray.length; i++) {
      if (this.discArray[i] === processo.id) {
        this.discArray[i] = null;
        this.freeDiscPages.push(i);
      }
    }
    this.freeDiscPages.sort((a, b) => a - b);
  }

  public copiarEstado(): void {
    this.tempo++;
    this.registrarEstadoRAM();
    this.registrarEstadoDISCO();
  }

  private alocarDiscoTudo(processos: IProcesso[]): void {
    processos.forEach((processo) => {
      if (this.freeDiscPages.length >= processo.tamanho) {
        processo.indicePaginasAlocadas = [];
        for (let i = 0; i < processo.tamanho; i++) {
          const pagina = this.freeDiscPages.shift()!;
          this.discArray[pagina] = processo.id;
          processo.indicePaginasAlocadas.push(pagina);
        }
        processo.memoria = "disco";
      }
    });
    this.registrarEstadoDISCO();
  }
}
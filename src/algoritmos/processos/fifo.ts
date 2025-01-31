export interface IProcesso {
  id: number;
  chegada: number;
  tempo: number;
  tamanho: number;
  deadline: number;
  finalizado: boolean;
  memoria?: "ram" | "disco";
  indicePaginasAlocadas?: number[];
}

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
    this.tempo = 0;

    this.RAMvsTempo = [];
    this.DISCOvsTempo = [];

    this.alocarDiscoTudo(processos);
  }

  private registrarEstadoRAM(): void {
    this.RAMvsTempo.push([...this.RAMArray]);
  }

  private registrarEstadoDISCO(): void {
    this.DISCOvsTempo.push([...this.discArray]);
  }

  public alocarProcessoRAM(): void {
    this.tempo++;

    const processo = this.processInput.find(
      (p) => p.memoria === "disco"
    );

    if (!processo) return; // Se não houver processos para alocar, sai

    if (this.freeRAMPages.length >= processo.tamanho) {
      // Há espaço na RAM, aloca normalmente
      processo.indicePaginasAlocadas = [];

      for (let i = 0; i < processo.tamanho; i++) {
        const pagina = this.freeRAMPages.shift()!;
        this.RAMArray[pagina] = processo.id;
        processo.indicePaginasAlocadas.push(pagina);
      }

      processo.memoria = "ram";
    } else {
      this.pageFaults++;
      this.liberarProcessoRAM();
      this.alocarProcessoRAM();
    }

    this.registrarEstadoRAM();
  }

  private liberarProcessoRAM(): void {
    if (this.paginasOcupadas.length === 0) return;

    // Remove o primeiro processo da RAM completamente
    const processoRemovido = this.processInput.find(p =>
      p.indicePaginasAlocadas?.some(pagina => this.RAMArray[pagina] !== null)
    );

    if (!processoRemovido) return;

    const paginasParaRemover = [...processoRemovido.indicePaginasAlocadas!];

    // Libera todas as páginas desse processo da RAM
    paginasParaRemover.forEach((pagina) => {
      this.RAMArray[pagina] = null;
      this.freeRAMPages.push(pagina);
    });

    // Move todo o processo para o disco
    this.moverRAMparaDISCO(processoRemovido);

    this.registrarEstadoRAM();
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

    processo.memoria = "disco";

    this.registrarEstadoDISCO();
  }
}
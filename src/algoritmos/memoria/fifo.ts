import { IProcesso } from "../IProcesso";

  
  export class FIFOMemoryManager {
    public ramSize: number;
    public pages: (number | null)[];
    public pageQueue: number[]; // Para rastrear a ordem das páginas (FIFO)
  
    constructor(ramSize: number) {
      this.ramSize = ramSize;
      this.pages = new Array(ramSize).fill(null);
      this.pageQueue = [];
    }
  
    alocarProcesso(processo: IProcesso): boolean {
      let paginasLivres: number[] = [];
      
      for (let i = 0; i < this.ramSize; i++) {
        if (this.pages[i] === null) {
          paginasLivres.push(i);
          if (paginasLivres.length === processo.tamanho) break;
        }
      }
  
      while (paginasLivres.length < processo.tamanho && this.pageQueue.length > 0) {
        const paginaSubstituir = this.pageQueue.shift()!;
        this.pages[paginaSubstituir] = null; // Libera a página
        paginasLivres.push(paginaSubstituir);
      }
  
      // Aloca as páginas
      if (paginasLivres.length >= processo.tamanho) {
        processo.paginasAlocadas = paginasLivres.slice(0, processo.tamanho);
        processo.paginasAlocadas.forEach(pagina => {
          this.pages[pagina] = processo.id;
          this.pageQueue.push(pagina);
        });
        return true;
      }
      return false;
    }
  
    liberarPaginas(processo: IProcesso) {
      processo.paginasAlocadas.forEach(pagina => {
        this.pages[pagina] = null;
        // Remove a página da fila (se ainda estiver presente)
        const index = this.pageQueue.indexOf(pagina);
        if (index !== -1) this.pageQueue.splice(index, 1);
      });
    }
  }
  
  
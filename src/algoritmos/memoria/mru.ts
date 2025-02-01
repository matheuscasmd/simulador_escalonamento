let ordemLRU: number[] = [];
  function alocarRAMLRU(processo: IProcesso) {
    const posicao = verificarProcessoCabeRAM(processo);
  
    if (posicao !== false) {
      // Aloca o processo na RAM
      for (let i = posicao; i < posicao + processo.tamanho; i++) {
        RAM[i] = { estado: "execucao", processoId: processo.id };
      }
  
      // Atualizar a lista de LRU
      ordemLRU = [
        ...ordemLRU.filter((id) => id !== processo.id), // Remove se já existir
        processo.id, // Adiciona ao final como o mais recente
      ];
  
      // Atualizar a lista de processos na RAM
      setProcessosRAM((prev) => [
        ...prev,
        { ...processo, posicaoInicialRAM: posicao },
      ]);
    } else {
      const RAMLivre = RAM.every((celula) => celula.estado === "livre");
  
      if (!RAMLivre) {
        // Encontrar o processo menos recentemente usado
        const processoMenosRecenteId = ordemLRU[0]; // Primeiro da lista
        const processoMenosRecente = processosRAM.find(
          (p) => p.id === processoMenosRecenteId
        );
  
        // Liberar a RAM ocupada pelo processo menos recentemente usado
        for (
          let i = processoMenosRecente.posicaoInicialRAM || 0;
          i <
          (processoMenosRecente.posicaoInicialRAM || 0) +
            processoMenosRecente.tamanho;
          i++
        ) {
          RAM[i] = { estado: "livre", processoId: undefined };
        }
  
        // Atualizar a lista de processos na RAM
        setProcessosRAM((prev) =>
          prev.filter((p) => p.id !== processoMenosRecente.id)
        );
  
        // Atualizar a lista LRU, removendo o processo menos recentemente usado
        ordemLRU = ordemLRU.filter((id) => id !== processoMenosRecenteId);
  
        // Tentar alocar novamente após liberar espaço
        alocarRAMLRU(processo);
      } else {
        // O processo não cabe na RAM
        console.log(
          "O processo não cabe na RAM. Possui " +
            (processo.tamanho - RAM.length) +
            " páginas a mais do que a RAM."
        );
      }
    }
  }
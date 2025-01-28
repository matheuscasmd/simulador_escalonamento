function startChecking(callback: () => void, stopAfterSeconds?: number): void {
    // Inicia o intervalo para verificar a cada segundo
    const intervalId = setInterval(() => {
      callback();
    }, 1000); // Intervalo de 1 segundo
  
    // Para automaticamente após X segundos, se especificado
    if (stopAfterSeconds !== undefined) {
      setTimeout(() => {
        clearInterval(intervalId);
        console.log("Verificação encerrada.");
      }, stopAfterSeconds * 1000);
    }
  }
  
  // Exemplo de uso
  startChecking(() => {
    console.log("Executando verificação:", new Date());
  }, 10); // Para automaticamente após 10 segundos4

  
     

  function escalonadorSincrono(processos : Processo[]): void {

    if(processos.every(processo.tempoParaConcluir === 0)){
        break
    }
    // tempo atual
    escanoladorRAM(processos)
    const intervaloProcesos = setInterval(() => {
        escalonadorProcessos(processos) // plau escalona um processo
        // se alguem terminar execucao tirar da ram (chamar escalonador ram)
        // se alguem for substituido tirar da ram (chamar escalonador ram)
    }, quantum * 1000);

    const intervaloSobrecarga = setInterval(()=>{

    },sobrecarga * 1000)

    escalonadorSincrono(processos)
  }
  
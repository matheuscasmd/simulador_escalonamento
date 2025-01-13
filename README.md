# Algoritmos de Escalonamento de Processos e Troca de Páginas

Este repositório é relativo a uma atividade final da disciplina de Sistemas Operacionais do semestre 2024.2 da Universidade Federal da Bahia (UFBA).
Teve como objetivo principal construir um software para simulação de algoritmos de escalonamento de processos e troca de páginas.


## 🔍 Sobre o Projeto

O simulador suporta **N processos** que podem chegar em tempos distintos para execução. Para cada processo, os seguintes dados devem ser fornecidos:

- **Tempo de chegada:** O instante em que o processo entra na fila.
- **Tempo de execução:** O tempo necessário para a execução do processo.
- **Deadline:** O prazo limite para conclusão do processo.
- **Quantum do sistema:** Tempo máximo em que cada processo pode estar em execução continuamente.
- **Sobrecarga do sistema:** O tempo necessário para alternar entre processos.


## ➕🟰 Algoritmos Implementados

### Escalonamento de Processos

- **FIFO (First-In, First-Out)**
- **SJF (Shortest Job First)**
- **Round Robin (RR)**
- **EDF (Earliest deadline first)**

### Troca de Páginas

- **FIFO (First-In, First-Out)**
- **LRU (Least Recently Used)**


## 🚀 Como Executar

1. **Clone este repositório:**

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { IProcesso } from "@/algoritmos/IProcesso"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const estadoCores: Record<number, string> = {
  2: "bg-blue-500",
  1: "bg-[#00FF00]",
  4: "bg-purple-500",
  3: "bg-yellow-500",
  5: "bg-[#2A2A2A]",
}

const estadoTexto = (estado: number) => {
  switch (estado) {
    case 1:
      return "Executando"
    case 2:
      return "Sobrecarga"
    case 3:
      return "Espera"
    case 4:
      return "Deadline Excedido"
    case 5:
      return "Ausente"
    default:
      return "Ausente"
  }
}

type HistoricoItem = {
  lista: number[][]
  turnaround: number
  processos: IProcesso[]
  algoritmoMemoria: "FIFO" | "MRU" | ""
  algoritmoProcessos: "FIFO" | "SJF" | "EDF" | "RR" | ""
}

export function Historico() {
  const [historico, setHistorico] = useState<HistoricoItem[]>([])

  useEffect(() => {
    carregarHistorico()
  }, [])

  const carregarHistorico = () => {
    const historicoSalvo = localStorage.getItem("historico_execucao")
    if (historicoSalvo) {
      try {
        const parsedData = JSON.parse(historicoSalvo)
        setHistorico(parsedData)
      } catch (error) {
        console.error("Erro ao parsear o histórico:", error)
        setHistorico([])
      }
    }
  }

  const limparHistorico = () => {
    localStorage.removeItem("historico_execucao")
    setHistorico([])
  }

  const formatProcessData = (processo: IProcesso) => {
    return (
      <div className="space-y-1 text-sm">
        <div><span className="text-muted-foreground">Chegada:</span> <span className="text-primary">{processo.chegada}</span></div>
        <div><span className="text-muted-foreground">Tempo de execução:</span> <span className="text-primary">{processo.tempo}</span></div>
        <div><span className="text-muted-foreground">Tamanho:</span> <span className="text-primary">{processo.tamanho}</span></div>
        <div><span className="text-muted-foreground">Deadline:</span> <span className="text-primary">{processo.deadline}</span></div>
        
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mt-10">
      <div className="flex justify-between items-center">
        <CardTitle className="text-3xl text-center w-full text-primary">Histórico de execução</CardTitle>
        
      </div>
      {historico.length > 0 && (
          <Button variant="ghost" size="sm" onClick={limparHistorico} className="flex items-center gap-2 bg-primary">
            <Trash2 className="h-4 w-4" />
            Limpar histórico
          </Button>
        )}
      {historico.length === 0 ? (
        <Card className="bg-sidebar border-none rounded-lg p-6">
          <CardContent className="flex items-center justify-center">
            <p className="text-primary">
            Nenhum dado está presente no histórico.
            </p>
          </CardContent>
        </Card>
      ) : (
        <TooltipProvider delayDuration={0}>
          {historico.map((item, index) => (
            <Card key={index} className="bg-sidebar border-none rounded-lg p-6 w-full overflow-x-auto">
              <CardContent className="p-0">
                {(item.algoritmoProcessos || item.algoritmoMemoria) && (
                  <div className="mb-4 space-y-1">
                    {item.algoritmoProcessos && (
                      <div>
                        <span className="text-muted-foreground">Algoritmo de Processos:</span>{" "}
                        <span className="text-primary">{item.algoritmoProcessos}</span>
                      </div>
                    )}
                    {item.algoritmoMemoria && (
                      <div>
                        <span className="text-muted-foreground">Algoritmo de Memória:</span>{" "}
                        <span className="text-primary">{item.algoritmoMemoria}</span>
                      </div>
                    )}
                  </div>
                )}

                {item.lista && Array.isArray(item.lista) ? (
                  item.lista.map((esteira, esteiraIndex) => (
                    <div key={esteiraIndex} className="mb-4">
                      <div className="text-[#00FF00] font-medium text-sm mb-2">
                        Processo {esteiraIndex + 1}
                      </div>
                      <div className="flex space-x-1">
                        {esteira.map((estado, idx) => {
                          const processo = item.processos && item.processos[esteiraIndex];
                          
                          return (
                            <Tooltip key={idx}>
                              <TooltipTrigger asChild>
                                <div
                                  className={`min-w-[38px] min-h-[38px] border border-[#333333] ${estadoCores[estado]} opacity-90 rounded-[4px] cursor-help`}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="bg-sidebar border-sidebar-border">
                                <div className="font-medium mb-1">Estado: {estadoTexto(estado)}</div>
                                {processo ? (
                                  formatProcessData(processo)
                                ) : (
                                  <p className="text-muted-foreground">Dados do processo não disponíveis</p>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">Dados inválidos</div>
                )}
                <div className="mt-4 text-lg text-[#00FF00]">
                  Turnaround: <span className="text-white">{item.turnaround ? item.turnaround.toFixed(2) : "N/A"}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TooltipProvider>
      )}
    </div>
  )
}
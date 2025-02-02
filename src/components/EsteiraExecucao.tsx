import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "./ui/card"


type EsteiraExecucaoProps = {
  // lista: IEstado[][]
  lista : number[][]
  turnaround : number
  velocidade : number
}

const estadoCores: Record<number, string> = {
  2: "bg-blue-500",
  1: "bg-[#00FF00]",
  4: "bg-purple-500",
  3: "bg-yellow-500",
  5: "bg-[#2A2A2A]",
}



export function EsteiraExecucao({ lista,turnaround,velocidade }: EsteiraExecucaoProps) {
  const [visibleStates, setVisibleStates] = useState<number[]>(lista.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStates((prev) =>
        prev.map((state, index) => (state < lista[index].length - 1 ? state + 1 : state))
      )
    }, 1/velocidade * 1000)

    return () => clearInterval(interval)
  }, [lista, velocidade])

  const estadoTexto = (estado: string): string => {
    switch (estado) {
      case "1":
        return "Executando"
      case "2":
        return "Sobrecarga"
      case "3":
        return "Espera"
      case "4":
        return "Deadline Excedido"
      case "5":
        return "Ausente"
      default:
        return "Ausente"
    }
  }

  return (
    <Card className="bg-[#1A1A1A] border-none rounded-lg flex flex-col p-6 w-full overflow-x-auto">
      {/* Seletor de Velocidade */}
      

      {/* Renderização da Lista de Processos */}
      <div className="min-w-max w-full">
        {lista.map((processo, index) => (
          <div key={index} className="flex flex-col space-y-2 mb-6">
            <span className="text-[#00FF00] font-medium text-lg">Processo {index + 1}</span>
            <div className="flex space-x-1">
              {processo.map((estado, idx) => (
                <motion.div
                  key={idx}
                  className={`min-w-[38px] min-h-[38px] border border-[#333333] ${
                    estadoCores[estado]
                  } opacity-90 rounded-[4px]`}
                  initial={{ scale: 0 }}
                  animate={{ scale: idx <= visibleStates[index] ? 1 : 0 }}
                  transition={{ duration: 0.1 }} // Transição refletindo a velocidade selecionada
                  title={`Estado: ${estado}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legenda de Estados */}
      <div className="flex flex-wrap gap-4 sticky left-0 text-sm">
        {Object.entries(estadoCores).map(([estado, cor]) => (
          <div key={estado} className="flex items-center gap-2">
            <div className={`w-6 h-6 ${cor} opacity-90 rounded-[4px] border border-[#333333]`} />
            <span className="text-[#00FF00] font-medium capitalize text-lg">{estadoTexto(estado)}</span>
          </div>
        ))}
      </div>
      <div>
        <p className="text-lg text-[#00FF00]">Turnaround: {turnaround.toFixed(2)} </p>
      </div>
    </Card>
  )
}

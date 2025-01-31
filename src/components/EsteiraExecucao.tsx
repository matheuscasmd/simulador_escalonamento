"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card } from "./ui/card"
import { IEstado } from "@/algoritmos/IEstado"


type EsteiraExecucaoProps = {
  lista: IEstado[][]
}

const estadoCores: Record<IEstado, string> = {
  ram: "bg-blue-500",
  execucao: "bg-[#00FF00]",
  sobrecarga: "bg-yellow-500",
  disco: "bg-purple-500",
  ausente: "bg-[#2A2A2A]",
  finalizado: "bg-gray-500",
}

const VELOCIDADES_PREDEFINIDAS = [1, 2, 5, 10] // Velocidades em segundos

export function EsteiraExecucao({ lista }: EsteiraExecucaoProps) {
  const [velocidade, setVelocidade] = useState<number>(2) // Velocidade inicial: 2s
  const [visibleStates, setVisibleStates] = useState<number[]>(lista.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStates((prev) =>
        prev.map((state, index) => (state < lista[index].length - 1 ? state + 1 : state))
      )
    }, 1/velocidade * 1000)

    return () => clearInterval(interval)
  }, [lista, velocidade])

  const handleVelocidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVelocidade(Number(e.target.value))
  }

  return (
    <Card className="bg-[#1A1A1A] border border-[#333333] rounded-lg flex flex-col space-y-4 p-6 w-full mx-40 overflow-x-auto">
      {/* Seletor de Velocidade */}
      <div className="flex items-center gap-4 sticky left-0">
        <span className="text-[#00FF00] text-lg font-medium">Velocidade: </span>
        <select
          value={velocidade}
          onChange={handleVelocidadeChange}
          className="bg-[#2A2A2A] text-[#00FF00] border border-[#333333] rounded-lg px-4 py-2 text-xl"
        >
          {VELOCIDADES_PREDEFINIDAS.map((v) => (
            <option key={v} value={v}>
              {v}s
            </option>
          ))}
        </select>
      </div>

      {/* Renderização da Lista de Processos */}
      <div className="min-w-max">
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
            <span className="text-[#00FF00] font-medium capitalize text-lg">{estado}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type MemoriaSlot = {
  id: number | null
  status: "livre" | "ocupado" | "execucao"
}

type MemoriaCardProps = {
  ram: number[]
  disco: number[]
}

export function MemoriaCard({ ram, disco }: MemoriaCardProps) {
  const [ramSlots, setRamSlots] = useState<MemoriaSlot[]>(Array(50).fill({ id: null, status: "livre" }))
  const [discoSlots, setDiscoSlots] = useState<MemoriaSlot[]>(Array(150).fill({ id: null, status: "livre" }))

  useEffect(() => {
    if(ram.length != 0){
      
    }
    setRamSlots(
      ram.map((processId, index) => ({
        id: processId,
        status: processId === null ? "livre" : index === ram.findIndex(p => p !== null) ? "execucao" : "ocupado",
      }))
    )
  }, [ram])

  useEffect(() => {
    setDiscoSlots(
      disco.map((processId) => ({
        id: processId,
        status: processId === null ? "livre" : "ocupado",
      }))
    )
  }, [disco])

  const renderSlots = (slots: MemoriaSlot[], isRam: boolean) => (
    <div className="flex flex-wrap gap-[2px]">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`w-6 h-6 border border-[#333333] rounded-[4px] flex items-center justify-center
            ${
              slot.status === "livre"
                ? "bg-transparent"
                : isRam
                  ? slot.status === "execucao"
                    ? "bg-blue-500"
                    : "bg-green-500"
                  : "bg-purple-500"
            }`}
        >
          {slot.id !== null && <span className="text-white text-[8px] font-bold">{slot.id}</span>}
        </div>
      ))}
    </div>
  )

  return (
    <Card className="bg-muted border-border w-full max-w-[1000px] mx-auto">
      <CardHeader>
        <CardTitle className="text-primary flex">Memória</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-8">
        <div className="flex-1">
          <span className="text-primary font-semibold mb-2 text-xl">RAM</span>
          {renderSlots(ramSlots, true)}
        </div>
        <div className="flex-1">
          <span className="text-primary font-semibold mb-2 text-xl">DISCO</span>
          {renderSlots(discoSlots, false)}
        </div>
      </CardContent>
    </Card>
  )
}

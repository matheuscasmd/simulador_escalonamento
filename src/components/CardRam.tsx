"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type RAMSlot = {
  id: number | null
  status: "livre" | "ocupado" | "execucao"
}

export function RAMCard() {
  const [ramSlots, setRamSlots] = useState<RAMSlot[]>(Array(50).fill({ id: null, status: "livre" }))

  return (
    <Card className="bg-muted border-border w-full max-w-[440px] mx-auto">
      <CardHeader>
        <CardTitle className="text-primary">RAM</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-[2px]">
          {ramSlots.map((slot, index) => (
            <div
              key={index}
              className={`w-8 h-8 border border-[#333333] rounded-[4px] flex items-center justify-center
                ${
                  slot.status === "livre"
                    ? "bg-transparent"
                    : slot.status === "ocupado"
                      ? "bg-green-500"
                      : "bg-blue-500"
                }`}
            >
              {slot.id !== null && <span className="text-white text-xs font-bold">{slot.id}</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


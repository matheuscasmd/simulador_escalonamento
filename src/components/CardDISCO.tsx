"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

type DiscoSlot = {
  id: number | null
  status: "livre" | "ocupado"
}

export function DiscoCard() {
  const [discoSlots, setDiscoSlots] = useState<DiscoSlot[]>(Array(150).fill({ id: null, status: "livre" }))

  return (
    <Card className="bg-muted border-border w-full max-w-[620px] mx-auto">
      <CardHeader>
        <CardTitle className="text-primary">DISCO</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-[2px]">
          {discoSlots.map((slot, index) => (
            <div
              key={index}
              className={`w-6 h-6 border border-[#333333] rounded-[4px] flex items-center justify-center
                ${slot.status === "livre" ? "bg-transparent" : "bg-purple-500"}`}
            >
              {slot.id !== null && <span className="text-white text-[10px] font-bold">{slot.id}</span>}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
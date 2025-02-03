import { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type MemoriaSlot = {
  id: number | null;
};

type MemoriaCardProps = {
  RAMvsTempo: (number | null)[][];
  DISCOvsTempo: (number | null)[][];
  velocidade: number;
};

export function MemoriaCard({ RAMvsTempo, DISCOvsTempo, velocidade }: MemoriaCardProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!RAMvsTempo || !DISCOvsTempo) return;
    
    const interval = setInterval(() => {
      setFrame((prevFrame) => {
        if (prevFrame + 1 >= RAMvsTempo.length) {
          clearInterval(interval);
          return prevFrame;
        }
        return prevFrame + 1;
      });
    }, (1 / velocidade) * 1000);
  
    return () => clearInterval(interval);
  }, [RAMvsTempo, DISCOvsTempo, velocidade]);
  

  const ramSlots = useMemo(() =>
    RAMvsTempo[frame]?.map((processId) => ({ id: processId })) || Array(50).fill(null),
    [frame, RAMvsTempo]
  );

  const discoSlots = useMemo(() =>
    DISCOvsTempo[frame]?.map((processId) => ({ id: processId })) || Array(150).fill(null),
    [frame, DISCOvsTempo]
  );

  const renderSlots = (slots: MemoriaSlot[], isRam: boolean) => (
    <div className="flex flex-wrap gap-[2px]">
      {slots.map((slot, index) => (
        <div
          key={index}
          className={`w-6 h-6 border border-[#333333] rounded-[4px] flex items-center justify-center
            ${slot.id === null ? "bg-transparent" : isRam ? "bg-green-500" : "bg-purple-500"}`}
        >
          {slot.id !== null && <span className="text-white text-[15px] font-bold">{slot.id}</span>}
        </div>
      ))}
    </div>
  );
  if (!RAMvsTempo || !DISCOvsTempo || RAMvsTempo.length === 0) {
    return <p>Carregando memória...</p>;
  }
  return (
    <Card className="bg-muted border-border w-full max-w-2xl mx-auto mr-20">
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
  );
}
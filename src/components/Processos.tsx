import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

interface Processo {
  id: number
  tempoChegada: number
  tempoCompletar: number
  tamanho: number
  deadline: number
}

const infoProcesso: { placeholder: string; label: keyof Processo; id: string }[] = [
  { placeholder: "Tempo de chegada", label: "tempoChegada", id: "tempoChegada" },
  { placeholder: "Tempo de execução", label: "tempoCompletar", id: "tempoCompletar" },
  { placeholder: "Tamanho", label: "tamanho", id: "tamanho" },
  { placeholder: "Deadline", label: "deadline", id: "deadline" },
]

export function Processos() {
  const [processos, setProcessos] = useState<Processo[]>([])
  const [currentProcesso, setCurrentProcesso] = useState<Partial<Processo>>({})
  const [maxProcessos, setMaxProcessos] = useState<number>(10)

  const handleChange = (id: string, value: string) => {
    setCurrentProcesso((prev) => ({ ...prev, [id]: Number(value) }))
  }

  const addProcesso = () => {
    if (Object.keys(currentProcesso).length === infoProcesso.length && processos.length < maxProcessos) {
      const newProcesso: Processo = {
        id: processos.length + 1,
        tempoChegada: currentProcesso.tempoChegada || 0,
        tempoCompletar: currentProcesso.tempoCompletar || 0,
        tamanho: currentProcesso.tamanho || 0,
        deadline: currentProcesso.deadline || 0,
      }
      setProcessos((prev) => [...prev, newProcesso])
      setCurrentProcesso({})
    }
  }

  const reset = () => {
    setProcessos([])
    setCurrentProcesso({})
  }

  const renderInputs = () => {
    return infoProcesso.map((item) => (
      <div key={item.id} className="mb-4">
        <Label htmlFor={item.id} className="block mb-2 text-white">
          {item.placeholder}
        </Label>
        <Input
          id={item.id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={item.placeholder}
          value={currentProcesso[item.label] || ""}
          onChange={(e) => handleChange(item.label, e.target.value)}
          className="w-full px-3 py-2 bg-muted border-border text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary"
        />
      </div>
    ))
  }

  const renderProcessos = () => {
    if (processos.length < 3) {
      return processos.map((processo) => (
        <Card key={processo.id} className="w-fit mb-4 bg-muted border-border">
          <CardHeader>
            <CardTitle className="text-primary">Processo {processo.id}</CardTitle>
          </CardHeader>
          <CardContent>
            {infoProcesso.map((item) => (
              <p key={item.id} className="mb-2 text-white">
                <span className="font-semibold text-primary">{item.placeholder}:</span> {processo[item.label]}
              </p>
            ))}
          </CardContent>
        </Card>
      ))
    }
    return (
      <Carousel className="w-full max-w-xs mx-auto">
        <CarouselContent>
          {processos.map((processo) => (
            <CarouselItem key={processo.id}>
              <Card className="w-full bg-muted border-border">
                <CardHeader>
                  <CardTitle className="text-primary">Processo {processo.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  {infoProcesso.map((item) => (
                    <p key={item.id} className="mb-2 text-white">
                      <span className="font-semibold text-primary">{item.placeholder}:</span> {processo[item.label]}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
    
  }

  const progressPercentage = (processos.length / maxProcessos) * 100

  return (
    <div className="min-h-screen bg-sidebar relative z-40 w-full">
      <div className=" inset-0 circuit-background" />
      <div className="mx-auto p-6 pt-20 z-10">
        <div className="flex flex-wrap justify-around gap-8">
          <div className="w-full flex flex-row gap-8 h-fit items-start justify-center">
            <div className="h-max w-max space-y-4">
            <Card className="bg-muted border-border">
              <CardHeader>
                <CardTitle className="text-primary">Configuração</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="maxProcessos" className="block mb-2 text-white">
                    Número máximo de processos
                  </Label>
                  <Input
                    id="maxProcessos"
                    type="number"
                    min="1"
                    value={maxProcessos}
                    onChange={(e) => setMaxProcessos(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-muted border-border text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted border-border">
              <CardHeader>
                <CardTitle className="text-primary">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="w-full bg-muted-foreground/20" />
                <p className="mt-2 text-center text-white">
                  {processos.length} de {maxProcessos} processos adicionados
                </p>
              </CardContent>
            </Card>
            </div>
            
            
            <Card className="bg-muted border-border">
              <CardHeader>
                <CardTitle className="text-primary">Adicionar Processo</CardTitle>
              </CardHeader>
              <CardContent>
                {renderInputs()}
                <div className="space-x-4">
                  <Button
                    onClick={addProcesso}
                    disabled={processos.length >= maxProcessos}
                    className="bg-primary text-black hover:bg-primary/90"
                  >
                    Adicionar Processo
                  </Button>
                  <Button onClick={reset} variant="outline" className="border-primary text-primary hover:scale-105">
                    Resetar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 w-full justify-center">
            {renderProcessos()}
          </div>
    </div>
  )
}

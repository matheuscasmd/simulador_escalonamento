import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"


type ConfigProps = {
  variante : "configurado" | "editar" | "fechado"
  setProcessos(x : string):void
  setQuantum(x : string):void
  setSobrecarga(x : string):void
  processos : number | undefined
  quantum : number | undefined
  sobrecarga : number | undefined
}
export const Config = (config : ConfigProps) => {

    return (
      <Card className="flex flex-col gap-4 px-4 py-8 h-full items-center mx-auto w-fit shadow-lg my-24 min-w-[500px]">
      <h1 className="text-4xl mb-40">Métricas</h1>
      <Label className="text-lg">Quantidade de processos:</Label>
        <Input
        value={config.processos}
        placeholder="Informe o número de processos"
        className="mb-4 w-3/4"
        onChange={(e) => config.setProcessos(e.target.value)}
        />
        <Label className="text-lg">Quantum:</Label>
        <Input
          value={config.quantum}
          placeholder="Informe o Quantum"
          className="mb-4 w-3/4"
          onChange={(e) => config.setQuantum(e.target.value)}
        />
      <Label className="text-lg">Tempo de Sobrecarga: </Label>
      <Input
        value={config.sobrecarga}
        placeholder="Informe o Tempo de Sobrecarga"
        className="mb-4 w-3/4"
        onChange={(e) => config.setSobrecarga(e.target.value)}
      />
      <div className="w-full flex justify-between mt-16">
        <span></span>
        <Button asChild className="size-24">
        <ArrowRight className="hover:cursor-pointer"/>
        </Button>
      </div>
    </Card>
    )
}
import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExecucaoData {
  sobrecarga: number
  quantum: number
  algoritmoProcessos: tipoalgproc
  algoritmoMemoria: tipoalgmem
}

type tipoalgproc = "FIFO" | "SJF"| "RR" | "EDF"
type tipoalgmem = "FIFO" | "MRU"

type ConfigFormProps = {
  setExecutar(param: boolean): void
  setAlgoritmoProcessos(arg : tipoalgproc):void
  setAlgoritmoMemoria(arg : tipoalgmem):void
  setQuantum(arg : number):void
  setSobrecarga(arg: number):void
  config : ExecucaoData
}

export default function ConfigForm(props: ConfigFormProps) {
  const [isEditing, setIsEditing] = useState(true)
  const [config, setConfig] = useState(props.config)

  const forceReload = () => {
    props.setExecutar(false)
    setTimeout(() => {
      props.setExecutar(true)
    }, 1)
  }

  const handleInputChange = (field: keyof ExecucaoData, value: string | number) => {
    if (field === "quantum" || field === "sobrecarga") {
      if (typeof value === "string" && !/^\d*$/.test(value)) {
        return
      }
      value = Number(value)
    }

    const updatedConfig = { ...config, [field]: value }
    setConfig(updatedConfig)

    if (field === 'sobrecarga') {
      props.setSobrecarga(Number(value))
    } else if (field === 'quantum') {
      props.setQuantum(Number(value))
    } else if (field === 'algoritmoProcessos') {
      props.setAlgoritmoProcessos(value as tipoalgproc)
    } else if (field === 'algoritmoMemoria') {
      props.setAlgoritmoMemoria(value as tipoalgmem)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isEditing ? (
        <Card className="bg-muted border-border w-full">
          <CardHeader>
            <CardTitle className="text-primary">Configuração</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="sobrecarga" className="text-primary">
                    Sobrecarga
                  </Label>
                  <input
                    id="sobrecarga"
                    defaultValue={config.sobrecarga}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => handleInputChange('sobrecarga', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantum" className="text-primary">
                    Quantum
                  </Label>
                  <input
                    defaultValue={config.quantum}
                    id="quantum"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) => handleInputChange('quantum', e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="algoritmoProcessos" className="text-primary">
                    Algoritmo de Processos
                  </Label>
                  <Select
                    defaultValue={config.algoritmoProcessos}
                    onValueChange={(value) => handleInputChange('algoritmoProcessos', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o algoritmo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FIFO">FIFO</SelectItem>
                      <SelectItem value="EDF">EDF</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="SJF">SJF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="algoritmoMemoria" className="text-primary">
                    Algoritmo de Memória
                  </Label>
                  <Select
                    defaultValue={config.algoritmoMemoria}
                    onValueChange={(value) => handleInputChange('algoritmoMemoria', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o algoritmo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FIFO">FIFO</SelectItem>
                      <SelectItem value="MRU">MRU</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  className="bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                  onClick={() => setIsEditing(false)}
                  disabled={props.config.quantum === 0 || props.config.sobrecarga === 0}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted border-border w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-primary">Configuração</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => {
              setIsEditing(true)
              props.setExecutar(false)
            }}>
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-primary">Sobrecarga</Label>
                <p className="text-muted-foreground">{config.sobrecarga}</p>
              </div>
              <div>
                <Label className="font-medium text-primary">Quantum</Label>
                <p className="text-muted-foreground">{config.quantum}</p>
              </div>
              <div>
                <Label className="font-medium text-primary">Algoritmo de Processos</Label>
                <p className="text-muted-foreground">{config.algoritmoProcessos}</p>
              </div>
              <div>
                <Label className="font-medium text-primary">Algoritmo de Memória</Label>
                <p className="text-muted-foreground">{config.algoritmoMemoria}</p>
              </div>
            </div>
          </CardContent>
          <div className="flex flex-row w-full justify-end p-4">
            <Button variant="outline" className="text-primary bg-sidebar" onClick={forceReload}>Executar novamente</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
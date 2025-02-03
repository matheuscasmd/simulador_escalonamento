import { useState } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExecucaoData {
  sobrecarga: number
  quantum: number
  algoritmoProcessos: string
  algoritmoMemoria: string
}

type ConfigFormProps = {
  setExecutar(param : boolean): void
}



export default function ConfigForm(props: ConfigFormProps) {
  const [isEditing, setIsEditing] = useState(true)
  const [config, setConfig] = useState<ExecucaoData>({
    sobrecarga: 0,
    quantum: 0,
    algoritmoProcessos: "FIFO",
    algoritmoMemoria: "FIFO",
  })

  const forceReload = () => {
    props.setExecutar(false)
    setTimeout(() => {
      props.setExecutar(true)
    }, 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    localStorage.setItem('config', JSON.stringify(config))
    setIsEditing(false)
  }

  const isSubmitDisabled = config.sobrecarga === 0 || config.quantum === 0

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isEditing ? (
        <Card className="bg-muted border-border w-full">
          <CardHeader>
            <CardTitle className="text-primary">Configuração</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="sobrecarga" className="text-primary">
                    Sobrecarga
                  </Label>
                  <input
                    id="sobrecarga"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={config.sobrecarga}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                    onChange={(e) => setConfig({ ...config, sobrecarga: Number(e.target.value) })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quantum" className="text-primary">
                    Quantum
                  </Label>
                  <input
                    id="quantum"
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={config.quantum}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                    onChange={(e) => setConfig({ ...config, quantum: Number(e.target.value) })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="algoritmoProcessos" className="text-primary">
                    Algoritmo de Processos
                  </Label>
                  <Select
                    value={config.algoritmoProcessos}
                    onValueChange={(value) => setConfig({ ...config, algoritmoProcessos: value })}
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
                    value={config.algoritmoMemoria}
                    onValueChange={(value) => setConfig({ ...config, algoritmoMemoria: value })}
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
                  type="button"
                  onClick={() =>
                    setConfig({ sobrecarga: 0, quantum: 0, algoritmoProcessos: "FIFO", algoritmoMemoria: "FIFO" })
                  }
                  variant="outline"
                  className="border-primary text-primary hover:scale-105"
                >
                  Resetar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="bg-primary text-black hover:bg-primary/90 disabled:opacity-50"
                  onClick={()=>props.setExecutar(true)}
                >
                  Confirmar
                </Button>
              </div>
            </form>
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
import { ChevronLeft, ChevronRight, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { IProcesso } from "../algoritmos/IProcesso"
import { useNavigate } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"

const infoProcesso: {
  placeholder: string
  label: keyof Omit<IProcesso, "id" | "estado" | "paginasAlocadas">
  id: string
}[] = [
  { placeholder: "Tempo de chegada", label: "chegada", id: "tempoChegada" },
  { placeholder: "Tempo de execução", label: "tempo", id: "tempoCompletar" },
  { placeholder: "Tamanho", label: "tamanho", id: "tamanho" },
  { placeholder: "Deadline", label: "deadline", id: "deadline" },
]

const DISC_SIZE = 150
const MAX_PAGINAS_POR_PROCESSO = 10

export function Processos() {
  const [processos, setProcessos] = useState<IProcesso[]>([])
  const [currentProcesso, setCurrentProcesso] = useState<Partial<IProcesso>>({})
  const [editingProcessId, setEditingProcessId] = useState<number | null>(null)
  const [editedProcess, setEditedProcess] = useState<Partial<IProcesso>>({})
  const [currentPage, setCurrentPage] = useState(0)
  const [avaliable, setAvaliable] = useState(DISC_SIZE)

  useEffect(() => {
    const storedProcessos = localStorage.getItem("processos")
    if (storedProcessos) {
      setProcessos(JSON.parse(storedProcessos))
    }
  }, [])

  useEffect(() => {
    let temp = 0
    processos.forEach((processo) => {
      temp += processo.tamanho
    })
    setAvaliable(DISC_SIZE - temp)
    localStorage.setItem("processos", JSON.stringify(processos))
  }, [processos])

  const router = useNavigate()
  const itemsPerPage = 3
  const totalPages = Math.ceil(processos.length / itemsPerPage)

  const goToAlgorithms = () => {
    router("/app/execucao", { replace: true })
  }

  const reset = () => {
    setProcessos([])
    setCurrentProcesso({})
    setCurrentPage(0)
    setAvaliable(DISC_SIZE)
  }

  const handleChange = (id: string, value: string) => {
    if (/^\d*$/.test(value)) {
      let numericValue = value === "" ? undefined : Number(value)

      if (id === "tamanho" && numericValue !== undefined) {
        const maxTamanho = Math.min(MAX_PAGINAS_POR_PROCESSO, avaliable)
        if (numericValue > maxTamanho) {
          numericValue = maxTamanho
        }
        if (numericValue < 1) {
          numericValue = 1
        }
      }

      if (
        (id === "tempo") &&
        numericValue !== undefined &&
        numericValue < 1
      ) {
        numericValue = 1
      }

      // deadline pode ser 0
      if (id === "deadline" && numericValue !== undefined && numericValue < 0) {
        numericValue = 0
      }

      setCurrentProcesso((prev) => ({ ...prev, [id]: numericValue }))
    }
  }

  const addProcesso = () => {
    if (
      Object.keys(currentProcesso).length >= 4 &&
      currentProcesso.tamanho !== undefined &&
      currentProcesso.tamanho > 0 &&
      currentProcesso.tempo !== undefined &&
      currentProcesso.tempo > 0 &&
      currentProcesso.chegada !== undefined &&
      currentProcesso.chegada > 0
    ) {
      const newProcesso: IProcesso = {
        id: processos.length + 1,
        chegada: currentProcesso.chegada || 0,
        tempo: currentProcesso.tempo || 0,
        tamanho: currentProcesso.tamanho || 0,
        deadline: currentProcesso.deadline || 0,
        tempoEspera: 0,
        finalizado: false,
        turnaround: 0,
      }
      setProcessos((prev) => [...prev, newProcesso])
      setCurrentProcesso({})
      if (processos.length + 1 > itemsPerPage) {
        setCurrentPage(Math.floor(processos.length / itemsPerPage))
      }
    } else {
      alert("Todos os campos (exceto deadline) devem ser maiores que 0.")
    }
  }

  const renderInputs = () => {
    return infoProcesso.map((item) => (
      <div key={item.id} className="mb-4">
        <Label htmlFor={item.id} className="block mb-2 text-primary">
          {item.placeholder}
        </Label>
        <Input
          id={item.id}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder={item.placeholder}
          value={currentProcesso[item.label] === undefined ? "" : String(currentProcesso[item.label])}
          onChange={(e) => handleChange(item.label, e.target.value)}
          className="w-full px-3 py-2 bg-muted border-border text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary"
        />
      </div>
    ))
  }

  const handleEditClick = (processo: IProcesso) => {
    setEditingProcessId(processo.id)
    setEditedProcess({ ...processo })
  }

  const handleInputChange = (id: string, value: string) => {
    if (/^\d*$/.test(value)) {
      let numericValue = value === "" ? undefined : Number(value)

      // Cap 'tamanho' input during editing
      if (id === "tamanho" && numericValue !== undefined) {
        const originalProcess = processos.find((p) => p.id === editingProcessId)
        const originalTamanho = originalProcess?.tamanho || 0
        const maxTamanho = Math.min(MAX_PAGINAS_POR_PROCESSO, avaliable + originalTamanho)
        if (numericValue > maxTamanho) {
          numericValue = maxTamanho
        }
        if (numericValue < 1) {
          numericValue = 1
        }
      }

      if (
        (id === "tempo") &&
        numericValue !== undefined &&
        numericValue < 1
      ) {
        numericValue = 1
      }

      if (id === "deadline" && numericValue !== undefined && numericValue < 0) {
        numericValue = 0
      }

      setEditedProcess((prev) => ({ ...prev, [id]: numericValue }))
    }
  }

  const handleSave = (id: number) => {
    setProcessos((prev) => prev.map((proc) => (proc.id === id ? { ...proc, ...editedProcess } : proc)))
    setEditingProcessId(null)
    setEditedProcess({})
  }

  const handleDelete = (id: number) => {
    setProcessos((prev) => {
      const updatedProcessos = prev.filter((proc) => proc.id !== id)
      const reindexedProcessos = updatedProcessos.map((proc, index) => ({
        ...proc,
        id: index + 1,
      }))
      if (currentPage > Math.floor((reindexedProcessos.length - 1) / itemsPerPage)) {
        setCurrentPage(Math.max(0, Math.floor((reindexedProcessos.length - 1) / itemsPerPage)))
      }
      return reindexedProcessos
    })
  }

  const renderProcessos = () => {
    const start = currentPage * itemsPerPage
    const end = start + itemsPerPage
    const currentProcessos = processos.slice(start, end)

    return (
      <div className="flex items-center justify-center gap-4">
        {processos.length > itemsPerPage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="text-primary hover:text-primary/80"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}
        <div className="flex gap-4">
          {currentProcessos.map((processo) => (
            <Card key={processo.id} className="w-80 bg-muted border-border">
              <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle className="text-primary">Processo {processo.id}</CardTitle>
                {editingProcessId === processo.id ? (
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setEditingProcessId(null)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => handleSave(processo.id)}>Salvar</Button>
                  </div>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="flex flex-col space-y-2">
                        <Button variant="ghost" className="justify-start" onClick={() => handleEditClick(processo)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          className="justify-start text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(processo.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </CardHeader>
              <CardContent>
                {infoProcesso.map((item) => (
                  <div key={item.id} className="mb-2">
                    <span className="font-semibold text-primary">{item.placeholder}:</span>{" "}
                    {editingProcessId === processo.id ? (
                      <Input
                        id={item.id}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={editedProcess[item.label] === undefined ? "" : String(editedProcess[item.label])}
                        onChange={(e) => handleInputChange(item.label, e.target.value)}
                        className="w-full px-3 py-2 bg-muted border-border text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                      />
                    ) : (
                      <span className="text-white">{String(processo[item.label]) || "N/A"}</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        {processos.length > itemsPerPage && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage >= totalPages - 1}
            className="text-primary hover:text-primary/80"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sidebar relative z-40 w-full flex flex-col items-center">
      <div className="bg-sidebar relative z-40 w-full max-w-4xl mx-auto">
        <div className="inset-0 circuit-background" />
        <div className="mx-auto p-4">
          <div className="flex flex-wrap justify-around">
            <div className="w-full flex flex-col gap-4 h-fit items-center justify-center">
              <Card className="bg-muted border-border w-full mt-28">
                <CardHeader className="pb-4">
                  <CardTitle className="text-primary mb-4">Registrar processo</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderInputs()}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary">Páginas disponíveis no disco: <span className='text-white'>{avaliable} páginas</span></span>
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button onClick={reset} variant="outline" className="border-primary text-primary hover:scale-105">
                      Resetar processos atuais
                    </Button>
                    <Button
                      onClick={addProcesso}
                      className="bg-primary text-black hover:bg-primary/90"
                      disabled={avaliable === 0}
                    >
                      Adicionar novo
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Button onClick={goToAlgorithms} className="mb-4">
                Algoritmos de escalonamento
              </Button>
            </div>
          </div>
        </div>
      </div>
      {processos.length > 0 && (
        <div className="w-full mt-2 pb-4">
          {renderProcessos()}
        </div>
      )}
    </div>
  )
}
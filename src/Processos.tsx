import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IProcesso } from "./algoritmos/IProcesso";
import { useNavigate } from "react-router-dom";


const infoProcesso: { placeholder: string; label: keyof Omit<IProcesso, "id" | "estado" | "paginasAlocadas">; id: string }[] = [
  { placeholder: "Tempo de chegada", label: "chegada", id: "tempoChegada" },
  { placeholder: "Tempo de execução", label: "tempo", id: "tempoCompletar" },
  { placeholder: "Tamanho", label: "tamanho", id: "tamanho" },
  { placeholder: "Deadline", label: "deadline", id: "deadline" }
];

export function Processos() {
  const [processos, setProcessos] = useState<IProcesso[]>([]);
  const [currentProcesso, setCurrentProcesso] = useState<Partial<IProcesso>>({});
  const [maxProcessos, setMaxProcessos] = useState<number>(10);

  const router = useNavigate()


  const saveAndGoToAlgorithms = () => {
    localStorage.setItem("processos", JSON.stringify(processos));
    router("/app/execucao",{replace: true})
  };

  const reset = () => {
    setProcessos([]);
    setCurrentProcesso({});
  };
  const handleChange = (id: string, value: string) => {
    setCurrentProcesso((prev) => (isNaN(Number(value))? prev : { ...prev, [id]: value === "" ? undefined : Number(value) }));
  };


  const addProcesso = () => {
      if (Object.keys(currentProcesso).length >= 4 && processos.length < maxProcessos) {
          const newProcesso: IProcesso = {
              id: processos.length + 1,
              chegada: currentProcesso.chegada || 0,
              tempo: currentProcesso.tempo || 0,
              tamanho: currentProcesso.tamanho || 0,
              deadline: currentProcesso.deadline || 0,
              tempoEspera: 0,
              finalizado: false,
              turnaround: 0
          };
          setProcessos((prev) => [...prev, newProcesso]);
          setCurrentProcesso({});
      }
  };

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
                  value={currentProcesso[item.label] === undefined ? "" : String(currentProcesso[item.label])}
                  onChange={(e) => handleChange(item.label, e.target.value)}
                  className="w-full px-3 py-2 bg-muted border-border text-white placeholder:text-gray-500 focus:ring-primary focus:border-primary"
              />
          </div>
      ));
  };

  const renderProcessos = () => {
      return processos.map((processo) => (
          <Card key={processo.id} className="w-fit mb-4 bg-muted border-border">
              <CardHeader>
                  <CardTitle className="text-primary">Processo {processo.id}</CardTitle>
              </CardHeader>
              <CardContent>
                  {infoProcesso.map((item) => (
                      <p key={item.id} className="mb-2 text-white">
                          <span className="font-semibold text-primary">{item.placeholder}:</span>{" "}
                          {String(processo[item.label]) || "N/A"}
                      </p>
                  ))}
                  <p className="mb-2 text-white">
                          <span className="font-semibold text-primary">Finalizado:</span>{" "}
                          {String(processo.finalizado)}
                      </p>
              </CardContent>
          </Card>
      ));
  };

  const progressPercentage = (processos.length / maxProcessos) * 100;

  return (
    <div className="min-h-screen bg-sidebar relative z-40 w-full flex flex-row">
      <div className="h-full bg-sidebar relative z-40 w-full">
        <div className=" inset-0 circuit-background" />
        <div className="mx-auto p-6 pt-20 z-10">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="w-full flex flex-col gap-8 h-fit items-center justify-center">
              <Card className="bg-muted border-border w-full">
                <CardHeader>
                  <CardTitle className="text-primary">Configuração</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="maxProcessos" className="block mb-2 text-white">
                      Número de processos
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

              <Card className="bg-muted border-border  w-full">
                <CardHeader>
                  <CardTitle className="text-primary">Adicionar Processo</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderInputs()}
                  <div className="flex justify-end space-x-4">
                    <Button onClick={reset} variant="outline" className="border-primary text-primary hover:scale-105">
                      Resetar
                    </Button>
                    <Button
                      onClick={addProcesso}
                      disabled={processos.length >= maxProcessos}
                      className="bg-primary text-black hover:bg-primary/90"
                    >
                      Adicionar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted border-border  w-full">
                <CardHeader>
                  <CardTitle className="text-primary">Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={progressPercentage} className="w-full bg-muted-foreground/20" />
                  <p className="mt-2 text-center text-white">
                    {processos.length} de {maxProcessos} processos adicionados
                  </p>
                  <div className="flex justify-end">
                    <Button
                      disabled={maxProcessos !== processos.length}
                      onClick={saveAndGoToAlgorithms}
                      className="mt-2"
                    >
                      Ir para algoritmos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full max-h-[850px] items-start justify-start pt-20 overflow-y-scroll">
        {renderProcessos()}
      </div>
    </div>
  );
}
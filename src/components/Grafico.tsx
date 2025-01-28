import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Processo {
  id: number;
  tempoExecucao: number;
  tempoSobrecarga: number;
  tempoEspera: number;
}

const processData: Processo[] = [
  { id: 1, tempoExecucao: 4, tempoSobrecarga: 2, tempoEspera: 3 },
  { id: 2, tempoExecucao: 3, tempoSobrecarga: 1, tempoEspera: 5 },
  { id: 3, tempoExecucao: 5, tempoSobrecarga: 3, tempoEspera: 2 },
];

const totalTime = (process: Processo) =>
  process.tempoExecucao + process.tempoSobrecarga + process.tempoEspera;

export function GraficoProcessos() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const getBarColor = (process: Processo, time: number) => {
    if (time < process.tempoExecucao) return "bg-green-500"; // Execução
    if (time < process.tempoExecucao + process.tempoSobrecarga) return "bg-red-500"; // Sobrecarga
    if (time < totalTime(process)) return "bg-yellow-500"; // Espera
    return "bg-gray-300"; // Após o término
  };

  const resetSimulation = () => {
    setCurrentTime(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-sidebar p-6">
      <Card className="mb-6 bg-muted border-border">
        <CardHeader>
          <CardTitle className="text-primary">Simulação de Processos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button onClick={() => setIsRunning(true)} className="bg-primary text-black hover:bg-primary/90">
              Iniciar
            </Button>
            <Button onClick={() => setIsRunning(false)} variant="outline" className="border-primary text-primary">
              Pausar
            </Button>
            <Button onClick={resetSimulation} variant="outline" className="border-red-500 text-red-500">
              Resetar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {processData.map((process) => (
          <Card key={process.id} className="bg-muted border-border">
            <CardHeader>
              <CardTitle className="text-primary">Processo {process.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-8 flex items-center relative">
                {[...Array(totalTime(process))].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: index < currentTime ? "100%" : "0" }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${
                      index < currentTime ? getBarColor(process, index) : "bg-gray-300"
                    }`}
                    style={{ flex: "1" }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

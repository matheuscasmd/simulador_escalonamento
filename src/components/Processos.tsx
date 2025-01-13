"use client"
import React, { useState } from "react";
import { Card, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectTrigger } from "./ui/select";
type ProcessoInput = {
  placeholder: string;
  label: string;
  id: string;
};

const infoProcesso: ProcessoInput[] = [
  { placeholder: "Tempo de chegada", label: "tempoChegada", id: "tempoChegada" },
  { placeholder: "Tempo de execução", label: "tempoExecucao", id: "tempoExecucao" },
  { placeholder: "Deadline", label: "deadline", id: "deadline" },
];

export function Processos() {
  const [processos, setProcessos] = useState<Record<string, string>[]>([]);
  const [currentProcesso, setCurrentProcesso] = useState<Record<string, string>>(
    {}
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [algoritmo,setAlgoritmo] = useState()

  const handleChange = (id: string, value: string) => {
    setCurrentProcesso((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (Object.keys(currentProcesso).length === infoProcesso.length) {
      setProcessos((prev) => [...prev, currentProcesso]);
      setCurrentProcesso({});
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleConfirm = () => {
    if (Object.keys(currentProcesso).length === infoProcesso.length) {
      setProcessos((prev) => [...prev, currentProcesso]);
      alert("Todos os processos foram salvos com sucesso!");
    }
  };

  const renderInputs = () => {
    return infoProcesso.map((item) => (
      <div key={item.id} style={{ marginBottom: "1rem" }}>
        <Label htmlFor={item.id}>{item.placeholder}</Label>
        <Input
          id={item.id}
          placeholder={item.placeholder}
          value={currentProcesso[item.id] || ""}
          onChange={(e) => handleChange(item.id, e.target.value)}
        />
      </div>
    ));
  };

  const renderProcessos = () => {
    return processos.map((processo, index) => (
      <Card key={index} className="p-4 text-left h-fit text-gray-600">
        <h3 className="text-lg">Processo {index + 1}</h3>
        {infoProcesso.map((item) => (
          <p key={item.id}>
            <b className="text-black">{item.placeholder}:</b> {processo[item.id]}
          </p>
        ))}
      </Card>
    ));
  };

  return (
    algoritmo ? 
    <Card className="flex flex-col md:flex-row gap-8 p-6 mx-auto w-[60%] shadow-lg">
      <span className="text-lg">Algoritmo selecionado: <b className="text-black">{algoritmo}</b></span>
      {renderProcessos()}
      <Card className="p-4 w-fit text-gray-600">
        <h3 className="text-lg pb-2">Processo: {currentIndex + 1}</h3>
        <span className="text-gray-600">Algoritmo selecionado: <b className="text-black">{algoritmo}</b> </span>
        {renderInputs()}
        <Button
          onClick={currentIndex < 2 ? handleNext : handleConfirm}
          className=""
        >
          {currentIndex < 2 ? "Próximo" : "Confirmar"}
        </Button>
      </Card>
    </Card>
    :
    <Card className="flex flex-col md:flex-row gap-8 p-6 mx-auto w-[60%] shadow-lg">
        <Select>
            <SelectTrigger>
            </SelectTrigger>
            <SelectContent>
                
            </SelectContent>
        </Select>
    </Card>
  );
}

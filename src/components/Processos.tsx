"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { X } from "lucide-react";

type ProcessoInput = {
  placeholder: string;
  label: string;
  id: string;
};

type Preemptivo = "RR" | "EDF";
type NaoPreemptivo = "FIFO" | "SJF";

const infoProcesso: ProcessoInput[] = [
  { placeholder: "Tempo de chegada", label: "tempoChegada", id: "tempoChegada" },
  { placeholder: "Tempo de execução", label: "tempoExecucao", id: "tempoExecucao" },
  { placeholder: "Deadline", label: "deadline", id: "deadline" },
];

export function Processos() {
  const [numeroProcessos,setNumeroProcessos] = useState<string>()
  const [processos, setProcessos] = useState<Record<string, string>[]>([]);
  const [currentProcesso, setCurrentProcesso] = useState<Record<string, string>>(
    {}
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [algoritmo, setAlgoritmo] = useState<Preemptivo | NaoPreemptivo | null>(null);
  const [quantum, setQuantum] = useState<string | null>(null);
  const [sobrecarga, setSobrecarga] = useState<string | null>(null);

  const handleChange = (id: string, value: string) => {
    setCurrentProcesso((prev) => ({ ...prev, [id]: value }));
  };

  const next = () => {
    if (Object.keys(currentProcesso).length.toString() === numeroProcessos) {
      setProcessos((prev) => [...prev, currentProcesso]);
      setCurrentProcesso({});
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const reset = () => {
    setAlgoritmo(null)
    setQuantum(null)
    setSobrecarga(null)
    setProcessos([])
    setCurrentProcesso({})
  }
  const confirm = () => {
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

  return algoritmo && (algoritmo !== "RR" || (quantum && sobrecarga)) ? (
    <Card className="flex flex-col md:flex-row gap-8 p-6 mx-auto w-[60%] shadow-lg mt-28">
      <X className="hover:cursor-pointer align-bottom" onClick={()=> reset()}/>
      <span className="text-lg">
        Algoritmo selecionado: <b className="text-black">{algoritmo}</b>
        {algoritmo === "RR" && (
          <>
            <br />
            <b>Quantum:</b> {quantum}
            <br />
            <b>Sobrecarga:</b> {sobrecarga}
          </>
        )}
      </span>
      {renderProcessos()}
      <Card className="p-4 w-fit text-gray-600">
        <h3 className="text-lg pb-2">Processo: {currentIndex + 1}</h3>
        {renderInputs()}
        <Button
          onClick={currentIndex < 2 ? next : confirm}
          className=""
        >
          {currentIndex < 2 ? "Próximo" : "Confirmar"}
        </Button>
      </Card>
    </Card>
  ) : (
    <Card className="flex flex-col gap-4 p-6 mx-auto w-[60%] shadow-lg mt-28">
      <h1 className="text-4xl">Escalonamento de processos</h1>
      <Label className="text-lg pb-2">Selecione o Algoritmo</Label>
      <Select onValueChange={(value) => setAlgoritmo(value as Preemptivo | NaoPreemptivo)}>
        <SelectTrigger>
          <SelectValue placeholder="Escolha um algoritmo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FIFO">FIFO</SelectItem>
          <SelectItem value="SJF">SJF</SelectItem>
          <SelectItem value="RR">Round Robin</SelectItem>
          <SelectItem value="EDF">EDF</SelectItem>
        </SelectContent>
      </Select>
      <Label className="text-lg pb-2">Quantidade de processos:</Label>
        <Input
        value={numeroProcessos || ""}
        onChange={(e) => setNumeroProcessos(e.target.value)}
        placeholder="Informe o número de processos"
        className="mb-4"
        />
      {algoritmo === "RR" && (
        <div>
          <Label>Quantum</Label>
          <Input
            value={quantum || ""}
            onChange={(e) => setQuantum(e.target.value)}
            placeholder="Informe o Quantum"
            className="mb-4"
          />
          <Label>Tempo de Sobrecarga</Label>
          <Input
            value={sobrecarga || ""}
            onChange={(e) => setSobrecarga(e.target.value)}
            placeholder="Informe o Tempo de Sobrecarga"
            className="mb-4"
          />
          
        </div>
      )}
    </Card>
  );
}

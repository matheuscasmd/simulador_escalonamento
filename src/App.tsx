import { useState } from 'react'
import './App.css'
import { Menu } from './components/Menu'
import { Processos } from './components/Processos'
import { Memoria } from './components/Memoria'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'
import { Label } from 'recharts'
import { Card } from './components/ui/card'
import { Input } from './components/ui/input'

function App() {

  return (
    <div className='flex flex-row w-screen'>
      <Menu/>
      <div className='flex flex-col items-center w-full'>
      <Card className="flex flex-col gap-4 p-6 mx-auto w-[60%] shadow-lg mt-28">
      <h1 className="text-4xl">Escalonamento de processos</h1>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Escolha um algoritmo" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="FIFO">FIFO</SelectItem>
          <SelectItem value="SJF">SJF</SelectItem>
          <SelectItem value="RR">Round Robin</SelectItem>
          <SelectItem value="EDF">EDF</SelectItem>
        </SelectContent>
      </Select>
      <Label className="text-lg pb-2">Quantidade de processos:</Label>
        <Input
        value={""}
        placeholder="Informe o número de processos"
        className="mb-4"
        />
        <div>
          <Label>Quantum</Label>
          <Input
            placeholder="Informe o Quantum"
            className="mb-4"
          />
          <Label>Tempo de Sobrecarga</Label>
          <Input
            placeholder="Informe o Tempo de Sobrecarga"
            className="mb-4"
          />
          
        </div>
    </Card>
        <Memoria/>
      </div>
    </div>
  )
}

export default App



interface Processo {
  tempoChegada : number
  tempoParaExecutar : number
  deadline?: number
  quantum : number
  sobrecarga  : number
}

function getExecucaoProcesso(processo : Processo){
  processo.tempoChegada
}
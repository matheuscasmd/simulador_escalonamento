import { Card } from "@/components/ui/card";


type EsteiraExecucaoFinalProps = {
  lista: number[][];
  turnaround: number;
};

const estadoCores: Record<number, string> = {
  2: "bg-blue-500",
  1: "bg-[#00FF00]",
  4: "bg-purple-500",
  3: "bg-yellow-500",
  5: "bg-[#2A2A2A]",
};

const estadoTexto = (estado: string): string => {
  switch (estado) {
    case "1":
      return "Executando";
    case "2":
      return "Sobrecarga";
    case "3":
      return "Espera";
    case "4":
      return "Deadline Excedido";
    case "5":
      return "Ausente";
    default:
      return "Ausente";
  }
};



export function Historico({lista, turnaround} : EsteiraExecucaoFinalProps){
    return (
    <Card className="bg-[#1A1A1A] border-none rounded-lg flex flex-col p-6 w-full overflow-x-auto">
      {/* Renderização da Lista de Processos */}
      <div className="min-w-max">
        {lista.map((processo, index) => (
          <div key={index} className="flex flex-col space-y-2 mb-6">
            <span className="text-[#00FF00] font-medium text-lg">Processo {index + 1}</span>
            <div className="flex space-x-1">
              {processo.map((estado, idx) => (
                <div
                  key={idx}
                  className={`min-w-[38px] min-h-[38px] border border-[#333333] ${estadoCores[estado]} opacity-90 rounded-[4px]`}
                  title={`Estado: ${estado}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legenda de Estados */}
      <div className="flex flex-wrap gap-4 text-sm">
        {Object.entries(estadoCores).map(([estado, cor]) => (
          <div key={estado} className="flex items-center gap-2">
            <div className={`w-6 h-6 ${cor} opacity-90 rounded-[4px] border border-[#333333]`} />
            <span className="text-[#00FF00] font-medium capitalize text-lg">{estadoTexto(estado)}</span>
          </div>
        ))}
      </div>
      
      {/* Exibição do Turnaround */}
      <p className="text-lg text-[#00FF00] mt-4">Turnaround: <span className="text-white">{turnaround.toFixed(2)}</span></p>
    </Card>
    )
}




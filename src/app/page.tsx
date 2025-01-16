
"use-client"
import { Memoria } from "@/components/Memoria";
import { Processos } from "@/components/Processos";

export default function Page() {
  return (
    <body className="w-full flex flex-col">
      <Processos></Processos>
      <Memoria></Memoria>
    </body>
  );
}

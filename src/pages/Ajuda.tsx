import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Github, Info } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function Ajuda() {
    const router = useNavigate()
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="bg-muted border-border w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold text-primary">Bem vindo!</CardTitle>
          <Info className="h-6 w-6 text-primary" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground mt-2">
                Este projeto é um simulador de escalonamento de processos e gerenciamento de memória. Ele permite
                visualizar e entender como diferentes algoritmos funcionam em um sistema operacional.
              </p>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary">Funcionalidades Principais</Label>
              <ul className="list-disc list-inside text-muted-foreground mt-2">
                <li>Simulação de algoritmos de escalonamento de processos</li>
                <li>Simulação de algoritmos de gerenciamento de memória</li>
                <li>Interface interativa para configuração de parâmetros</li>
                <li>Visualização em tempo real dos resultados da simulação</li>
              </ul>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary">Tecnologias Utilizadas</Label>
              <p className="text-muted-foreground mt-2">React, TypeScript, Tailwind CSS, Shadcn UI</p>
            </div>

            <div>
              <Label className="text-lg font-medium text-primary">Como Utilizar</Label>
              <p className="text-muted-foreground mt-2">
                Ao clicar em "Vamos lá", você será redirecionado para uma página de configuração de processos. Caso seja a sua primeira vez utilizando a aplicação, não existirá nenhum
                processo salvo na memória. Insira as informações relativas a cada processo que você deseja incluir na simulação de escalonadores, quando estiver tudo pronto, clique em "Algoritmos de escalonamento".
                Depois disso, forneça o valor de sobrecarga e quantum, além de escolher o tipo de escalonamento, tanto para memória quanto para processos. Com isso, poderá clicar em executar e acompanhar a execução
                de cada processo e os estados da memória, ou seja, da RAM e do disco.
              </p>
              <p className="text-muted-foreground mt-2">Aproveite!</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-4">
          <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => window.open("https://github.com/matheuscasmd/simulador_escalonamento", "_blank")}
            >
                Repositório no Github
            </Button>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => router("/app/processos")}
            >
              Vamos lá!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


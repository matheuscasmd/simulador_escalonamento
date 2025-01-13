import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function Home() {
  return (
    <div className="min-h-screen w-full bg-card flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-1/2 bg-card border-gray-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-slate-600 font-bold text-center">
            Escalonador de processos
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 mt-20">
          <Button 
            variant="default" 
            className="w-full bg-card hover:bg-gray-100 text-gray-600 py-6 text-base"
          >
            Algoritmos de escalonamento
          </Button>
          <Button 
            variant="default"
            className="w-full bg-card hover:bg-gray-100 text-gray-600 py-6 text-base"
          >
            Algoritmos de substituição de páginas
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}


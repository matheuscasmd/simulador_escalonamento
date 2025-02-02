import Logo from "../assets/Group.png"
import { History, RotateCcw, CircleHelp, Play } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from 'react-router-dom'

const menuItems = [
  { icon: CircleHelp, label: "Ajuda", tooltip: "Acessar a documentação", url: "/app/ajuda"},
  { icon: RotateCcw, label: "Processos", tooltip: "Reiniciar a entrada de dados", url: "/app/processos" },
  { icon: Play, label: "Execução", tooltip: "Escolha de algoritmos de escalonamento e execução", url: "/app/execucao" },
  { icon: History, label: "Histórico de execução", tooltip: "Ver histórico de execuções", url: "/app/historico"},
]

export function Menu() {
  const router = useNavigate()
  
  return (
    <SidebarProvider className="w-fit pt-4 text-white">
      <Sidebar className="max-w-21 border-none bg-white h-screen flex flex-col">
        
        {/* Cabeçalho com tamanho ajustado */}
        <SidebarHeader 
          className="w-full flex flex-row items-center justify-start bg-sidebarItem p-3 cursor-pointer"
          onClick={() => router("/home")}
        >
          <img src={Logo} alt="logo" className="w-12 h-12"/>
          <span className="text-4xl font-semibold tracking-tight">
            SO<span className="text-xl">Simulator</span>
          </span>
        </SidebarHeader>

        {/* Conteúdo do menu com rolagem se necessário */}
        <SidebarContent className="bg-sidebarItem overflow-y-auto flex-1">
          <TooltipProvider delayDuration={0}>
            <SidebarMenu className="gap-4">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index} className="bg-sidebarItem">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton 
                        className="text-lg flex items-center space-x-2 px-4 py-2 w-full"
                        onClick={() => router(item.url)}
                      >
                        <item.icon className="size-5 stroke-green-600" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-sidebar">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </TooltipProvider>
        </SidebarContent>
      
      </Sidebar>
    </SidebarProvider>
  )
}

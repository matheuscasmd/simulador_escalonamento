import { Home, Settings, History, RotateCcw,CircleHelp, Play } from 'lucide-react'
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
    <SidebarProvider className='w-fit pt-4 text-white '>
      <Sidebar className='max-w-21 border-none bg-white'>
        <SidebarHeader className='w-full flex flex-row items-center text-left justify-start bg-sidebarItem cursor-pointer' onClick={()=>router("/home")}>
          <img src="..\..\src\assets\Group.png" alt="logo" className='w-16'/>
          <span className="text-5xl font-semibold tracking-tight">SO<span className='text-lg'>Simulator</span></span>
        </SidebarHeader>
        <SidebarContent className='bg-sidebarItem'>
          <TooltipProvider delayDuration={0}>
            <SidebarMenu className='gap-4'>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index} className='bg-sidebarItem'>
                  <Tooltip>
                    <TooltipTrigger asChild >
                      <SidebarMenuButton className='text-lg' onClick={() => router(item.url)}>
                        <item.icon className="mr-2 size=- stroke-green-600" />
                        {item.label}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right" className='bg-sidebar'>
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


"use client"

import { Home, Settings, History, RotateCcw,CircleHelp } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

const menuItems = [
  { icon: Home, label: "Home", tooltip: "Página inicial" },
  { icon: CircleHelp, label: "Ajuda", tooltip: "Acessar a documentação"},
  { icon: RotateCcw, label: "Reiniciar entradas", tooltip: "Reiniciar a entrada de dados" },
  { icon: History, label: "Histórico de execução", tooltip: "Ver histórico de execuções" },
]

export function AppSidebarMenu() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2 className="px-4 text-2xl font-semibold tracking-tight">SOSimulador</h2>
        </SidebarHeader>
        <SidebarContent>
          <TooltipProvider delayDuration={0}>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton className='text-lg'>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </TooltipProvider>
        </SidebarContent>
        <SidebarFooter>
          <TooltipProvider delayDuration={0}>
            <SidebarMenu>
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton>
                      <Settings className="mr-2 h-4 w-4"/>
                      <span className='text-lg'>Configurações</span>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Ajustar configurações</p>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </TooltipProvider>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}


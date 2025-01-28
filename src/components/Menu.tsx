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

export function Menu() {
  return (
    <SidebarProvider className='w-fit pt-4 text-white '>
      <Sidebar className='max-w-21 border-none bg-white'>
        <SidebarHeader className='w-full flex flex-row items-center text-left justify-start bg-sidebarItem'>
          <img src="src\assets\Group.png" alt="logo" className='w-16'/>
          <span className="text-5xl font-semibold tracking-tight">SO<span className='text-lg'>Simulator</span></span>
        </SidebarHeader>
        <SidebarContent className='bg-sidebarItem'>
          <TooltipProvider delayDuration={0}>
            <SidebarMenu className='gap-4'>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index} className='bg-sidebarItem'>
                  <Tooltip>
                    <TooltipTrigger asChild >
                      <SidebarMenuButton className='text-lg'>
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


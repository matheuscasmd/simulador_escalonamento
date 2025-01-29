"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "./components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export function Welcome() {
  const router = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen w-full flex flex-col items-center justify-center fullscreen-rectangle"
    >
      <motion.div
        variants={containerVariants}
        className="flex flex-col items-center max-w-2xl text-center space-y-12 w-full"
      >
        <motion.div variants={itemVariants} className="flex flex-row items-center justify-center gap-4 w-full">
          <motion.img
            src="src/assets/Group.png"
            alt="logo"
            className="w-[300px]"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
          />
          <motion.span variants={itemVariants} className="text-9xl font-semibold tracking-tight text-white">
            SO<span className="text-6xl">Simulator</span>
          </motion.span>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium text-white">
            Bem-vindo ao seu mais novo ambiente de estudos!
          </h2>
          <p className="text-lg text-gray-300">
            Aqui você pode visualizar na prática o funcionamento de um Sistema Operacional!
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            onClick={() => router("/processos")}
            className="mt-8 bg-white/10 hover:bg-white/20 text-white border border-[#00FF00]/50 hover:border-[#00FF00] transition-all duration-300 group"
          >
            Conhecer
            <ArrowRight className="ml-2 w-4 h-4 text-[#00FF00] group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}


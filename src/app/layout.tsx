import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // Importando a fonte Roboto
import "./globals.css";
import { AppSidebarMenu } from "@/components/Menu";

// Importando Roboto com as variantes necessárias
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Escolha os pesos que deseja usar
});

export const metadata: Metadata = {
  title: "SOSimulador",
  description: "Simule escalonamento de processos e substituição de páginas de memória!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div
        className={`${roboto.variable} antialiased`} // Aplicando Roboto
      >
        <div className="flex min-h-screen">
          <AppSidebarMenu />
          <div className="flex-1 px-8 py-6">{children}</div>
        </div>
      </div>
    </html>
  );
}

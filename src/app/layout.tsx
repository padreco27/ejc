import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | EJC – Flor do Carmelo",
    default: "EJC – Encontro de Jovens com Cristo | Flor do Carmelo",
  },
  description:
    "O Encontro de Jovens com Cristo da Paróquia Nossa Senhora do Carmo. Um fim de semana que transforma vidas e aprofunda a fé através da experiência pessoal com Jesus Cristo.",
  keywords: ["EJC", "Encontro de Jovens com Cristo", "Igreja Católica", "Nossa Senhora do Carmo", "retiro", "jovens"],
  openGraph: {
    title: "EJC – Flor do Carmelo",
    description: "Cristo Vive. Venha viver um encontro que transforma vidas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

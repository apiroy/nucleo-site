import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nucleoai.site"),
  title: "nucleoai.site | Plataformas a Medida",
  description: "Desarrollo de ecommerce robustos, sin comisiones mensuales. Potenciados por IA para emprendedores de 40+.",
  openGraph: {
    title: "nucleoai.site | Plataformas Profesionales a Medida",
    description: "Tu propio sitio web con pasarela, chatbot y ERP sin pagar comisiones por venta.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body style={{ fontFamily: 'var(--font-inter)' }}>{children}</body>
    </html>
  );
}

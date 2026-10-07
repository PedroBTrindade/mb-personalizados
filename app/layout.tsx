import type { Metadata } from "next";
import { Montserrat, Cinzel } from "next/font/google";
import "./globals.css";
import "./extras.css";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import CookieBanner from "@/components/CookieBanner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MB Personalizados | Presentes únicos e exclusivos",
    template: "%s | MB Personalizados",
  },
  description:
    "Presentes únicos e exclusivos totalmente personalizados: canecas, bodies de bebê, cestas e muito mais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${cinzel.variable}`}>
      <body>
        <Header />
        <Menu />
        <main>{children}</main>
        <CookieBanner />
      </body>
    </html>
  );
}

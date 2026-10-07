"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Baby, CalendarHeart, Gift, BadgePercent } from "lucide-react";

const itens = [
  { href: "/produtos", label: "Produtos", Icon: Coffee },
  { href: "/bodies-de-bebe", label: "Bodies de Bebê", Icon: Baby },
  { href: "/datas-comemorativas", label: "Datas comemorativas", Icon: CalendarHeart },
  { href: "/cestas-personalizadas", label: "Cestas Personalizadas", Icon: Gift },
  { href: "/promocoes", label: "Promoções", Icon: BadgePercent },
];

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="menu" aria-label="Categorias">
      {itens.map(({ href, label, Icon }) => {
        const ativo = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={ativo ? "active" : undefined}
            aria-current={ativo ? "page" : undefined}
          >
            <Icon aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Heart, Search, User, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo" aria-label="MB Personalizados, página inicial">
        {/* Coloque o logo em public/logo.png (de preferência com fundo transparente) */}
        <Image src="/logo.png" alt="MB Personalizados" width={150} height={150} priority />
      </Link>

      <div className="brand">
        <div className="brand-title">
          <Heart aria-hidden="true" />
          <span>PERSONALIZADOS</span>
        </div>
        <p>
          Presentes <b>únicos e exclusivos</b> totalmente personalizados!
        </p>
      </div>

      <form className="search" role="search" action="/busca">
        <input
          type="search"
          name="q"
          placeholder="Olá, o que você procura?"
          aria-label="Buscar produtos"
        />
        <button type="submit" aria-label="Buscar">
          <Search aria-hidden="true" />
        </button>
      </form>

      <div className="actions">
        <Link href="/minha-conta" className="account">
          <User aria-hidden="true" />
          Minha conta
        </Link>
        {/* O número 0 é fixo por enquanto; depois ligue ao estado do carrinho */}
        <Link href="/carrinho" className="cart" aria-label="Carrinho, 0 itens">
          <ShoppingBag aria-hidden="true" />
          <span>0</span>
        </Link>
      </div>
    </header>
  );
}

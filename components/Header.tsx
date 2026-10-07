import Image from "next/image";
import Link from "next/link";
import { Heart, Search, User, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { sair } from "@/lib/auth-actions";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let primeiroNome = "";
  let admin = false;

  if (user) {
    const { data: perfil } = await supabase
      .from("profiles")
      .select("nome, role")
      .eq("id", user.id)
      .single();
    primeiroNome = (perfil?.nome || user.email || "").split(/[ @]/)[0];
    admin = perfil?.role === "admin";
  }

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
        {user ? (
          <>
            <Link href="/minha-conta" className="account">
              <User aria-hidden="true" />
              Olá, {primeiroNome}
            </Link>
            {admin && (
              <Link href="/admin" className="account">
                Painel
              </Link>
            )}
            <form action={sair}>
              <button type="submit" className="account account-btn">
                Sair
              </button>
            </form>
          </>
        ) : (
          <Link href="/entrar" className="account">
            <User aria-hidden="true" />
            Entrar
          </Link>
        )}

        {/* O número 0 é fixo por enquanto; depois ligue ao estado do carrinho */}
        <Link href="/carrinho" className="cart" aria-label="Carrinho, 0 itens">
          <ShoppingBag aria-hidden="true" />
          <span>0</span>
        </Link>
      </div>
    </header>
  );
}

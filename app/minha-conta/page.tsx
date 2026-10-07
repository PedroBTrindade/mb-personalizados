import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sair } from "@/lib/auth-actions";

export const metadata: Metadata = { title: "Minha conta" };

export default async function MinhaContaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/entrar?proximo=/minha-conta");

  const { data: perfil } = await supabase
    .from("profiles")
    .select("nome, role")
    .eq("id", user.id)
    .single();

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1>Minha conta</h1>
        <p className="auth-sub">
          {perfil?.nome ? `${perfil.nome} · ` : ""}
          {user.email}
        </p>

        {perfil?.role === "admin" && (
          <Link href="/admin" className="btn-primario" style={{ display: "block", textAlign: "center" }}>
            Abrir painel da loja
          </Link>
        )}

        <p className="dica" style={{ marginTop: 16 }}>
          Em breve: seus pedidos e endereços.
        </p>

        <form action={sair} style={{ marginTop: 16 }}>
          <button type="submit" className="btn-sec">Sair da conta</button>
        </form>
      </div>
    </section>
  );
}

"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Estado = { erro?: string; ok?: string } | undefined;

// Só aceita caminhos internos (evita redirecionar para sites de golpe)
function destinoSeguro(p: string) {
  return p.startsWith("/") && !p.startsWith("//") && !p.includes("\\")
    ? p
    : "/minha-conta";
}

export async function entrar(_prev: Estado, formData: FormData): Promise<Estado> {
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");
  const proximo = String(formData.get("proximo") ?? "");

  if (!email || !senha) return { erro: "Preencha e-mail e senha." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password: senha });

  if (error) {
    if (error.message.toLowerCase().includes("not confirmed")) {
      return { erro: "Confirme seu e-mail antes de entrar. Procure a mensagem na sua caixa de entrada (e no spam)." };
    }
    return { erro: "E-mail ou senha incorretos." };
  }

  redirect(destinoSeguro(proximo));
}

export async function cadastrar(_prev: Estado, formData: FormData): Promise<Estado> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");
  const proximo = String(formData.get("proximo") ?? "");

  if (!nome) return { erro: "Informe seu nome." };
  if (!email) return { erro: "Informe seu e-mail." };
  if (senha.length < 8) return { erro: "A senha precisa ter pelo menos 8 caracteres." };

  const origem = (await headers()).get("origin") ?? "";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { nome },
      emailRedirectTo: `${origem}/auth/callback`,
    },
  });

  if (error) {
    return { erro: "Não foi possível criar a conta: " + error.message };
  }

  // O Supabase não dá erro quando o e-mail já existe; devolve usuário sem "identities"
  if (data.user && data.user.identities?.length === 0) {
    return { erro: "Este e-mail já tem cadastro. Tente entrar." };
  }

  // Confirmação de e-mail desligada: já entra direto
  if (data.session) redirect(destinoSeguro(proximo));

  return { ok: "Quase lá! Enviamos um e-mail de confirmação. Clique no link dele para ativar sua conta." };
}

export async function sair() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

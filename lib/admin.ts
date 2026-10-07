import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Chame no começo de TODA página e ação do painel.
// Sem login -> vai para /entrar. Logada, mas não admin -> página 404.
// (A proteção definitiva está nas regras do banco; isto é a camada de cima.)
export async function exigirAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/entrar?proximo=/admin");

  const { data: perfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (perfil?.role !== "admin") notFound();

  return { supabase, user };
}

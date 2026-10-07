import { createClient } from "@/lib/supabase/server";
import { promoAtiva, type ProdutoRow } from "@/lib/produtos-tipos";

// Produtos ativos, mais novos primeiro
export async function listarProdutosPublicos(): Promise<ProdutoRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("criado_em", { ascending: false });

  if (error) {
    console.error("Erro ao listar produtos:", error.message);
    return [];
  }
  return (data ?? []) as ProdutoRow[];
}

export async function listarPromocoes(): Promise<ProdutoRow[]> {
  const todos = await listarProdutosPublicos();
  return todos.filter(promoAtiva);
}

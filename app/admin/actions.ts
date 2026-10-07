"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { exigirAdmin } from "@/lib/admin";
import { slugify } from "@/lib/slug";

type Estado = { erro?: string } | undefined;

// "69,90" ou "1.234,56" ou "69.90" -> número. Vazio -> null.
function numero(v: FormDataEntryValue | null): number | null {
  const s = String(v ?? "").trim();
  if (!s) return null;
  const limpo = s.includes(",") ? s.replace(/\./g, "").replace(",", ".") : s;
  const n = Number(limpo);
  return Number.isFinite(n) ? n : NaN;
}

const DATA = /^\d{4}-\d{2}-\d{2}$/;

function revalidarTudo() {
  revalidatePath("/produtos");
  revalidatePath("/promocoes");
  revalidatePath("/admin");
}

// Caminho do arquivo dentro do bucket, a partir da URL pública
function caminhoNoBucket(url: string) {
  const marca = "/storage/v1/object/public/produtos/";
  const i = url.indexOf(marca);
  return i === -1 ? null : url.slice(i + marca.length);
}

export async function salvarProduto(_prev: Estado, fd: FormData): Promise<Estado> {
  const { supabase } = await exigirAdmin();

  const id = String(fd.get("id") ?? "");
  const nome = String(fd.get("nome") ?? "").trim();
  if (!nome) return { erro: "Informe o nome do produto." };

  const preco = numero(fd.get("preco"));
  if (preco == null || Number.isNaN(preco) || preco <= 0) {
    return { erro: "Informe um preço normal válido (ex.: 75,90)." };
  }

  const promo = numero(fd.get("preco_promocional"));
  if (promo !== null && (Number.isNaN(promo) || promo <= 0)) {
    return { erro: "O preço promocional é inválido." };
  }
  if (promo !== null && promo >= preco) {
    return { erro: "O preço promocional precisa ser menor que o preço normal." };
  }

  const ini = String(fd.get("promo_inicio") ?? "");
  const fim = String(fd.get("promo_fim") ?? "");
  const promo_inicio = promo !== null && DATA.test(ini) ? `${ini}T00:00:00-03:00` : null;
  const promo_fim = promo !== null && DATA.test(fim) ? `${fim}T23:59:59-03:00` : null;
  if (promo_inicio && promo_fim && promo_fim < promo_inicio) {
    return { erro: "A data final da promoção vem antes da inicial." };
  }

  // Só aceita fotos que estejam no nosso bucket
  const base = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/produtos/`;
  let imagens: string[] = [];
  try {
    const lista = JSON.parse(String(fd.get("imagens") ?? "[]"));
    if (Array.isArray(lista)) {
      imagens = lista.filter((u): u is string => typeof u === "string" && u.startsWith(base));
    }
  } catch {}

  const slug = slugify(String(fd.get("slug") ?? "").trim() || nome);
  if (!slug) return { erro: "Não foi possível gerar o endereço da página. Use letras no nome." };

  const dados = {
    nome,
    slug,
    descricao: String(fd.get("descricao") ?? "").trim() || null,
    categoria: String(fd.get("categoria") ?? "") || null,
    preco,
    preco_promocional: promo,
    promo_inicio,
    promo_fim,
    imagens,
    ativo: fd.get("ativo") === "on",
  };

  const { error } = id
    ? await supabase.from("produtos").update(dados).eq("id", id)
    : await supabase.from("produtos").insert(dados);

  if (error) {
    return {
      erro:
        error.code === "23505"
          ? "Já existe um produto com esse endereço de página. Mude o nome ou o campo de endereço."
          : "Não foi possível salvar: " + error.message,
    };
  }

  revalidarTudo();
  redirect("/admin");
}

export async function encerrarPromocao(fd: FormData) {
  const { supabase } = await exigirAdmin();
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await supabase
    .from("produtos")
    .update({ preco_promocional: null, promo_inicio: null, promo_fim: null })
    .eq("id", id);

  revalidarTudo();
}

export async function excluirProduto(fd: FormData) {
  const { supabase } = await exigirAdmin();
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  const { data } = await supabase.from("produtos").select("imagens").eq("id", id).maybeSingle();
  const { error } = await supabase.from("produtos").delete().eq("id", id);
  if (error) return;

  const caminhos = ((data?.imagens ?? []) as string[])
    .map(caminhoNoBucket)
    .filter((c): c is string => !!c);
  if (caminhos.length) await supabase.storage.from("produtos").remove(caminhos);

  revalidarTudo();
}

// Tipos e funções "puras" de produto (podem ser usadas no servidor e no navegador)
import type { Produto } from "@/data/produtos";

export type ProdutoRow = {
  id: string;
  slug: string;
  nome: string;
  descricao: string | null;
  categoria: string | null;
  preco: number;
  preco_promocional: number | null;
  promo_inicio: string | null;
  promo_fim: string | null;
  imagens: string[];
  tema: string;
  ativo: boolean;
  criado_em: string;
};

export const CATEGORIAS = [
  "Produtos",
  "Bodies de Bebê",
  "Datas comemorativas",
  "Cestas Personalizadas",
];

export const brl = (valor: number) =>
  Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type DadosPromo = Pick<
  ProdutoRow,
  "preco_promocional" | "promo_inicio" | "promo_fim"
>;

export type StatusPromo = "ativa" | "agendada" | "encerrada" | null;

export function statusPromo(r: DadosPromo, agora = Date.now()): StatusPromo {
  if (r.preco_promocional == null) return null;
  if (r.promo_inicio && new Date(r.promo_inicio).getTime() > agora) return "agendada";
  if (r.promo_fim && new Date(r.promo_fim).getTime() < agora) return "encerrada";
  return "ativa";
}

export const promoAtiva = (r: DadosPromo) => statusPromo(r) === "ativa";

// Data no fuso de São Paulo, no formato AAAA-MM-DD (para os campos de data)
export function dataSP(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

// Converte a linha do banco no formato que o ProductCard entende
export function paraProduto(r: ProdutoRow): Produto {
  const promo = promoAtiva(r);
  const tema = (["t1", "t2", "t3"].includes(r.tema) ? r.tema : "t1") as Produto["tema"];

  return {
    slug: r.slug,
    nome: r.nome,
    preco: promo ? Number(r.preco_promocional) : Number(r.preco),
    precoAntigo: promo ? Number(r.preco) : undefined,
    imagem: r.imagens?.[0],
    tema,
  };
}

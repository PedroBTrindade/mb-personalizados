import type { Metadata } from "next";
import Toolbar from "@/components/Toolbar";
import ProductGrid from "@/components/ProductGrid";
import { listarProdutosPublicos } from "@/lib/produtos";
import { paraProduto } from "@/lib/produtos-tipos";

export const metadata: Metadata = { title: "Produtos" };

const POR_PAGINA = 12;

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ ordem?: string; pagina?: string }>;
}) {
  const { ordem = "relevantes", pagina: paginaParam } = await searchParams;

  const lista = (await listarProdutosPublicos()).map(paraProduto);
  if (ordem === "menor-preco") lista.sort((a, b) => a.preco - b.preco);
  if (ordem === "maior-preco") lista.sort((a, b) => b.preco - a.preco);
  if (ordem === "nome") lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  const totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
  const pagina = Math.min(Math.max(1, Number(paginaParam) || 1), totalPaginas);
  const visiveis = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  return (
    <>
      <h1 className="page-title">Produtos</h1>
      <Toolbar ordem={ordem} pagina={pagina} totalPaginas={totalPaginas} />
      <section className="layout">
        <ProductGrid produtos={visiveis} />
      </section>
    </>
  );
}

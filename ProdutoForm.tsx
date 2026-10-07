import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { listarProdutosPublicos } from "@/lib/produtos";
import { normalizar, paraProduto } from "@/lib/produtos-tipos";

export const metadata: Metadata = {
  title: "Busca",
  robots: { index: false, follow: true },
};

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const consulta = q.trim().slice(0, 80);
  if (!consulta) redirect("/produtos");

  // Todas as palavras digitadas precisam aparecer (sem diferenciar acento ou maiúscula).
  // Quem tem a palavra no nome aparece antes de quem só tem na descrição/categoria.
  const termos = normalizar(consulta).split(/\s+/).filter(Boolean);

  const resultados = (await listarProdutosPublicos())
    .map((p) => {
      const nome = normalizar(p.nome);
      const tudo = `${nome} ${normalizar(`${p.descricao ?? ""} ${p.categoria ?? ""}`)}`;
      const noNome = termos.every((t) => nome.includes(t));
      const noTudo = termos.every((t) => tudo.includes(t));
      return { p, pontos: noNome ? 2 : noTudo ? 1 : 0 };
    })
    .filter((r) => r.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .map((r) => paraProduto(r.p));

  return (
    <>
      <h1 className="page-title">Resultados para &ldquo;{consulta}&rdquo;</h1>

      {resultados.length === 0 ? (
        <div className="busca-vazio">
          <p>Não encontramos nenhum produto para &ldquo;{consulta}&rdquo;.</p>
          <p className="dica">Confira a digitação ou tente uma palavra mais simples, como &ldquo;caneca&rdquo; ou &ldquo;body&rdquo;.</p>
          <Link href="/produtos" className="btn-primario">Ver todos os produtos</Link>
        </div>
      ) : (
        <>
          <p className="busca-info">
            {resultados.length} produto{resultados.length === 1 ? "" : "s"} encontrado
            {resultados.length === 1 ? "" : "s"}
          </p>
          <section className="layout">
            <ProductGrid produtos={resultados} />
          </section>
        </>
      )}
    </>
  );
}

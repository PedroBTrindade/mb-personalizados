import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { listarPromocoes } from "@/lib/produtos";
import { paraProduto } from "@/lib/produtos-tipos";

export const metadata: Metadata = { title: "Promoções" };

export default async function PromocoesPage() {
  const produtos = (await listarPromocoes()).map(paraProduto);

  return (
    <>
      <h1 className="page-title">Promoções</h1>
      <section className="layout">
        <ProductGrid produtos={produtos} />
      </section>
    </>
  );
}

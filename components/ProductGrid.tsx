import type { Produto } from "@/data/produtos";
import ProductCard from "./ProductCard";

export default function ProductGrid({ produtos }: { produtos: Produto[] }) {
  if (produtos.length === 0) {
    return <p>Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid">
      {produtos.map((p) => (
        <ProductCard key={p.slug} produto={p} />
      ))}
    </div>
  );
}

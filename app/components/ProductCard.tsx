import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/data/produtos";

const brl = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function ProductCard({ produto }: { produto: Produto }) {
  const { slug, nome, preco, precoAntigo, imagem, tema } = produto;
  const desconto = precoAntigo
    ? Math.round((1 - preco / precoAntigo) * 100)
    : 0;
  const href = `/produtos/${slug}`;

  return (
    <article className="card">
      <Link href={href} className={`thumb ${tema}`} aria-label={nome}>
        {desconto > 0 && <span className="badge">{desconto}% OFF</span>}

        {imagem ? (
          <Image
            src={imagem}
            alt={nome}
            fill
            sizes="(max-width: 900px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          // Placeholder até você ter as fotos reais
          <div className="bottle" aria-hidden="true" />
        )}
      </Link>

      <h4>
        <Link href={href}>{nome}</Link>
      </h4>

      <p className="price">
        {brl(preco)}
        {precoAntigo && <span className="price-old">{brl(precoAntigo)}</span>}
      </p>
      <p className="parcelas">ou 3x de {brl(preco / 3)} sem juros</p>

      <Link href={href} className="btn-personalizar">
        Personalizar
      </Link>
    </article>
  );
}

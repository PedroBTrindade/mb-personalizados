"use client";

import { useRouter } from "next/navigation";

type Props = {
  ordem: string;
  pagina: number;
  totalPaginas: number;
};

export default function Toolbar({ ordem, pagina, totalPaginas }: Props) {
  const router = useRouter();
  const ir = (p: number, o: string = ordem) =>
    router.push(`/produtos?ordem=${o}&pagina=${p}`);

  return (
    <div className="toolbar">
      <div className="selects">
        <select
          aria-label="Ordenar por"
          value={ordem}
          onChange={(e) => ir(1, e.target.value)}
        >
          <option value="relevantes">Mais relevantes</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="nome">Nome (A-Z)</option>
        </select>
      </div>

      <div className="pager">
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button
          type="button"
          aria-label="Página anterior"
          disabled={pagina <= 1}
          onClick={() => ir(pagina - 1)}
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Próxima página"
          disabled={pagina >= totalPaginas}
          onClick={() => ir(pagina + 1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}

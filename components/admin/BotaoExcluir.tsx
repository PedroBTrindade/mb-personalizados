"use client";

import { excluirProduto } from "@/app/admin/actions";

export default function BotaoExcluir({ id, nome }: { id: string; nome: string }) {
  return (
    <form
      action={excluirProduto}
      onSubmit={(e) => {
        if (!confirm(`Excluir "${nome}"? Isso não pode ser desfeito.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="btn-perigo">Excluir</button>
    </form>
  );
}

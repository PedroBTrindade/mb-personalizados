import Image from "next/image";
import Link from "next/link";
import { exigirAdmin } from "@/lib/admin";
import { brl, statusPromo, type ProdutoRow } from "@/lib/produtos-tipos";
import { encerrarPromocao } from "./actions";
import BotaoExcluir from "@/components/admin/BotaoExcluir";

const ROTULO = { ativa: "Ativa", agendada: "Agendada", encerrada: "Encerrada" } as const;

export default async function AdminPage() {
  const { supabase } = await exigirAdmin();

  const { data } = await supabase
    .from("produtos")
    .select("*")
    .order("criado_em", { ascending: false });
  const produtos = (data ?? []) as ProdutoRow[];

  return (
    <>
      <div className="admin-topo">
        <h1>Produtos</h1>
        <Link href="/admin/produtos/novo" className="btn-primario">+ Novo produto</Link>
      </div>

      {produtos.length === 0 ? (
        <p>Nenhum produto ainda. Clique em &quot;Novo produto&quot; para começar.</p>
      ) : (
        <div className="tabela-wrap">
          <table className="tabela">
            <thead>
              <tr>
                <th></th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Promoção</th>
                <th>Loja</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => {
                const st = statusPromo(p);
                return (
                  <tr key={p.id}>
                    <td>
                      {p.imagens[0] ? (
                        <Image src={p.imagens[0]} alt="" width={48} height={48} className="mini" />
                      ) : (
                        <span className="mini vazio" />
                      )}
                    </td>
                    <td>
                      {p.nome}
                      {p.categoria && <small>{p.categoria}</small>}
                    </td>
                    <td>{brl(p.preco)}</td>
                    <td>
                      {st ? (
                        <>
                          {brl(Number(p.preco_promocional))}
                          <small className={`status ${st}`}>{ROTULO[st]}</small>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{p.ativo ? "Visível" : "Oculto"}</td>
                    <td>
                      <div className="acoes">
                        <Link href={`/admin/produtos/${p.id}`} className="btn-sec">Editar</Link>
                        {st && (
                          <form action={encerrarPromocao}>
                            <input type="hidden" name="id" value={p.id} />
                            <button type="submit" className="btn-sec">Encerrar promoção</button>
                          </form>
                        )}
                        <BotaoExcluir id={p.id} nome={p.nome} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

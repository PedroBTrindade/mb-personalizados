"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { salvarProduto } from "@/app/admin/actions";
import { CATEGORIAS, dataSP, type ProdutoRow } from "@/lib/produtos-tipos";

type Estado = { erro?: string } | undefined;

const virgula = (n: number | null | undefined) =>
  n == null ? "" : String(n).replace(".", ",");

// Reduz fotos grandes de celular (até 1600px) antes de enviar
async function redimensionar(file: File, max = 1600): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const escala = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * escala);
  canvas.height = Math.round(bmp.height * escala);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff"; // fundo branco para PNG transparente
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((ok, falha) =>
    canvas.toBlob(
      (b) => (b ? ok(b) : falha(new Error("Não foi possível processar a foto."))),
      "image/jpeg",
      0.85
    )
  );
}

export default function ProdutoForm({ produto }: { produto?: ProdutoRow }) {
  const [estado, formAction, salvando] = useActionState<Estado, FormData>(
    salvarProduto,
    undefined
  );
  const [imagens, setImagens] = useState<string[]>(produto?.imagens ?? []);
  const [enviando, setEnviando] = useState(false);
  const [erroFoto, setErroFoto] = useState("");

  async function aoEscolher(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivos = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (arquivos.length === 0) return;

    setErroFoto("");
    setEnviando(true);
    try {
      const supabase = createClient();
      const novas: string[] = [];

      for (const arquivo of arquivos) {
        const blob = await redimensionar(arquivo);
        const caminho = `${crypto.randomUUID()}.jpg`;
        const { error } = await supabase.storage
          .from("produtos")
          .upload(caminho, blob, { contentType: "image/jpeg", cacheControl: "31536000" });
        if (error) throw new Error(error.message);
        novas.push(supabase.storage.from("produtos").getPublicUrl(caminho).data.publicUrl);
      }
      setImagens((atual) => [...atual, ...novas]);
    } catch (err) {
      setErroFoto(err instanceof Error ? err.message : "Falha ao enviar a foto.");
    } finally {
      setEnviando(false);
    }
  }

  const remover = (url: string) => setImagens((a) => a.filter((u) => u !== url));
  const tornarPrincipal = (url: string) =>
    setImagens((a) => [url, ...a.filter((u) => u !== url)]);

  return (
    <form action={formAction} className="admin-form">
      <input type="hidden" name="id" value={produto?.id ?? ""} />
      <input type="hidden" name="imagens" value={JSON.stringify(imagens)} />

      <label className="campo">
        Nome do produto
        <input name="nome" defaultValue={produto?.nome ?? ""} required />
      </label>

      <label className="campo">
        Descrição
        <textarea name="descricao" rows={4} defaultValue={produto?.descricao ?? ""} />
      </label>

      <div className="linha">
        <label className="campo">
          Categoria
          <select name="categoria" defaultValue={produto?.categoria ?? CATEGORIAS[0]}>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="campo">
          Endereço da página (opcional)
          <input
            name="slug"
            defaultValue={produto?.slug ?? ""}
            placeholder="gerado a partir do nome"
          />
        </label>
      </div>

      <fieldset className="bloco">
        <legend>Fotos</legend>
        <p className="dica">A primeira foto é a que aparece na vitrine. Fotos grandes são reduzidas automaticamente.</p>

        <div className="fotos">
          {imagens.map((url, i) => (
            <div className="foto" key={url}>
              <Image src={url} alt="" width={120} height={120} />
              {i === 0 ? (
                <span className="selo-principal">Principal</span>
              ) : (
                <button type="button" onClick={() => tornarPrincipal(url)}>Tornar principal</button>
              )}
              <button type="button" className="remover" onClick={() => remover(url)}>Remover</button>
            </div>
          ))}
        </div>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={aoEscolher}
          disabled={enviando}
        />
        {enviando && <p className="dica">Enviando fotos...</p>}
        {erroFoto && <p className="msg-erro">{erroFoto}</p>}
      </fieldset>

      <fieldset className="bloco">
        <legend>Preço e promoção</legend>
        <div className="linha">
          <label className="campo">
            Preço normal (R$)
            <input name="preco" inputMode="decimal" defaultValue={virgula(produto?.preco)} placeholder="75,90" required />
          </label>
          <label className="campo">
            Preço promocional (R$)
            <input name="preco_promocional" inputMode="decimal" defaultValue={virgula(produto?.preco_promocional)} placeholder="deixe vazio se não há promoção" />
          </label>
        </div>
        <div className="linha">
          <label className="campo">
            Promoção começa em (opcional)
            <input type="date" name="promo_inicio" defaultValue={dataSP(produto?.promo_inicio ?? null)} />
          </label>
          <label className="campo">
            Promoção termina em (opcional)
            <input type="date" name="promo_fim" defaultValue={dataSP(produto?.promo_fim ?? null)} />
          </label>
        </div>
        <p className="dica">Sem datas, a promoção vale até você removê-la. O selo de % OFF e o preço riscado aparecem sozinhos.</p>
      </fieldset>

      <label className="check">
        <input type="checkbox" name="ativo" defaultChecked={produto?.ativo ?? true} />
        Mostrar este produto na loja
      </label>

      {estado?.erro && <p className="msg-erro" role="alert">{estado.erro}</p>}

      <div className="linha-botoes">
        <button type="submit" className="btn-primario" disabled={salvando || enviando}>
          {salvando ? "Salvando..." : "Salvar produto"}
        </button>
        <Link href="/admin" className="btn-sec">Cancelar</Link>
      </div>
    </form>
  );
}

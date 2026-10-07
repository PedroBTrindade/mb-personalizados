import { notFound } from "next/navigation";
import { exigirAdmin } from "@/lib/admin";
import ProdutoForm from "@/components/admin/ProdutoForm";
import type { ProdutoRow } from "@/lib/produtos-tipos";

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { supabase } = await exigirAdmin();
  const { id } = await params;

  const { data } = await supabase.from("produtos").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <>
      <h1>Editar produto</h1>
      <ProdutoForm produto={data as ProdutoRow} />
    </>
  );
}

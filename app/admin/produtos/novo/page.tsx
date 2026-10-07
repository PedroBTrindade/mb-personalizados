import { exigirAdmin } from "@/lib/admin";
import ProdutoForm from "@/components/admin/ProdutoForm";

export default async function NovoProdutoPage() {
  await exigirAdmin();
  return (
    <>
      <h1>Novo produto</h1>
      <ProdutoForm />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { exigirAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await exigirAdmin();

  return (
    <div className="admin">
      <aside className="admin-nav">
        <h2>Painel</h2>
        <Link href="/admin">Produtos</Link>
        <Link href="/admin/produtos/novo">+ Novo produto</Link>
        <Link href="/produtos">Ver a loja</Link>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}

// Formato do produto usado pelos cards da vitrine.
// Os produtos em si agora ficam no banco (Supabase), cadastrados pelo painel /admin.
export type Produto = {
  slug: string;
  nome: string;
  preco: number;
  precoAntigo?: number; // se existir, mostra o selo de desconto
  imagem?: string;
  tema: "t1" | "t2" | "t3"; // cor de fundo do card enquanto não há foto
};

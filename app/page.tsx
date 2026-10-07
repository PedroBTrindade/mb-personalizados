import { redirect } from "next/navigation";

// Enquanto a home não existe, manda direto para a vitrine.
export default function Home() {
  redirect("/produtos");
}

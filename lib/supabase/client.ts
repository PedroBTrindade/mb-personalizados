import { createBrowserClient } from "@supabase/ssr";

// Usado no navegador (ex.: upload das fotos no painel)
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

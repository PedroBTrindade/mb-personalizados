import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Para onde o link do e-mail de confirmação leva
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/minha-conta`);
  }

  return NextResponse.redirect(`${origin}/entrar`);
}

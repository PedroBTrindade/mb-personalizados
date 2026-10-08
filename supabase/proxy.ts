import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

// Mantém o login da pessoa "fresco" a cada visita.
// Next 16: arquivo proxy.ts. Next 15 ou anterior: renomeie para middleware.ts.
export default async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";

const CHAVE = "mb-cookies-aceito";

export default function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      setVisivel(localStorage.getItem(CHAVE) !== "1");
    } catch {
      setVisivel(true);
    }
  }, []);

  function aceitar() {
    try {
      localStorage.setItem(CHAVE, "1");
    } catch {}
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div className="cookies" role="dialog" aria-label="Aviso de cookies">
      <Cookie className="cookie-icon" aria-hidden="true" />
      <p>
        Usamos cookies para melhorar sua experiência. Ao continuar navegando,
        você concorda com a nossa política de privacidade.
      </p>
      <button type="button" onClick={aceitar}>
        Entendi
      </button>
    </div>
  );
}

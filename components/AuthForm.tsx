"use client";

import { useActionState } from "react";
import Link from "next/link";
import { entrar, cadastrar } from "@/lib/auth-actions";

type Estado = { erro?: string; ok?: string } | undefined;

export default function AuthForm({
  modo,
  proximo = "",
}: {
  modo: "entrar" | "cadastrar";
  proximo?: string;
}) {
  const [estado, formAction, pendente] = useActionState<Estado, FormData>(
    modo === "entrar" ? entrar : cadastrar,
    undefined
  );
  const eEntrar = modo === "entrar";

  return (
    <div className="auth-card">
      <h1>{eEntrar ? "Entrar" : "Criar conta"}</h1>
      <p className="auth-sub">
        {eEntrar
          ? "Acesse sua conta para acompanhar seus pedidos."
          : "Leva menos de um minuto."}
      </p>

      <form action={formAction} className="auth-form">
        <input type="hidden" name="proximo" value={proximo} />

        {!eEntrar && (
          <label>
            Seu nome
            <input name="nome" type="text" autoComplete="name" required />
          </label>
        )}

        <label>
          E-mail
          <input name="email" type="email" autoComplete="email" required />
        </label>

        <label>
          Senha
          <input
            name="senha"
            type="password"
            autoComplete={eEntrar ? "current-password" : "new-password"}
            minLength={eEntrar ? undefined : 8}
            required
          />
          {!eEntrar && <small>Mínimo de 8 caracteres.</small>}
        </label>

        {estado?.erro && <p className="msg-erro" role="alert">{estado.erro}</p>}
        {estado?.ok && <p className="msg-ok" role="status">{estado.ok}</p>}

        <button type="submit" className="btn-primario" disabled={pendente}>
          {pendente ? "Aguarde..." : eEntrar ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <p className="auth-troca">
        {eEntrar ? (
          <>Ainda não tem conta? <Link href="/cadastrar">Cadastre-se</Link></>
        ) : (
          <>Já tem conta? <Link href="/entrar">Entrar</Link></>
        )}
      </p>
    </div>
  );
}

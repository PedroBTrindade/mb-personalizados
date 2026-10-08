/* Estilos do login e do painel de admin */

.account-btn { border: 0; background: none; cursor: pointer; font: inherit; font-weight: 700; font-size: 13px; }
.account-btn:hover, .actions .account:hover { color: var(--dourado); }

/* Botões */
.btn-primario, .btn-sec, .btn-perigo {
  display: inline-block; padding: 10px 18px; border-radius: 22px; border: 1px solid transparent;
  font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; text-align: center;
  transition: background-color .2s ease, opacity .2s ease;
}
.btn-primario { background: var(--marrom); color: var(--dourado-claro); }
.btn-primario:hover { background: var(--marrom-claro); }
.btn-primario:disabled { opacity: .6; cursor: wait; }
.btn-sec { background: var(--branco); color: var(--marrom); border-color: var(--borda); }
.btn-sec:hover { background: var(--creme-escuro); }
.btn-perigo { background: var(--branco); color: #a3281d; border-color: #e6b8b3; }
.btn-perigo:hover { background: #fbeceb; }

.msg-erro { color: #a3281d; background: #fbeceb; border-radius: 8px; padding: 10px 12px; font-size: 13px; }
.msg-ok { color: #1f6b43; background: #e8f5ee; border-radius: 8px; padding: 10px 12px; font-size: 13px; }
.dica { color: var(--texto-suave); font-size: 12px; }

/* Login / cadastro / minha conta */
.auth-wrap { display: flex; justify-content: center; padding: 48px var(--gutter) 72px; }
.auth-card { width: 100%; max-width: 420px; background: var(--branco); border-radius: 16px; padding: 32px; box-shadow: 0 6px 24px rgba(62,36,26,.1); }
.auth-card h1 { color: var(--marrom); font-size: 26px; }
.auth-sub { color: var(--texto-suave); font-size: 14px; margin: 4px 0 20px; }
.auth-form { display: flex; flex-direction: column; gap: 14px; }
.auth-form label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; font-weight: 600; color: var(--marrom); }
.auth-form input { height: 42px; padding: 0 14px; border: 1px solid var(--borda); border-radius: 10px; font: inherit; font-size: 14px; background: var(--creme); }
.auth-form input:focus { outline: 2px solid var(--dourado); border-color: transparent; }
.auth-form small { font-weight: 400; color: var(--texto-suave); }
.auth-troca { margin-top: 18px; font-size: 13px; text-align: center; color: var(--texto-suave); }
.auth-troca a { color: var(--dourado-elegante); font-weight: 700; }

/* Painel */
.admin { padding: 24px var(--lateral) 64px; }
.admin-main { flex: 1; min-width: 0; }
.admin-main h1 { color: var(--marrom); font-size: 24px; margin-bottom: 16px; }
.admin-topo { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; }
.admin-topo h1 { margin: 0; }

.tabela-wrap { overflow-x: auto; background: var(--branco); border-radius: 14px; box-shadow: 0 2px 10px rgba(62,36,26,.07); }
.tabela { width: 100%; border-collapse: collapse; font-size: 14px; }
.tabela th { text-align: left; padding: 12px 14px; font-size: 12px; text-transform: uppercase; letter-spacing: .4px; color: var(--texto-suave); border-bottom: 1px solid var(--borda); }
.tabela td { padding: 10px 14px; border-bottom: 1px solid var(--borda); vertical-align: middle; }
.tabela small { display: block; color: var(--texto-suave); font-size: 12px; }
.tabela .status.ativa { color: #1f6b43; font-weight: 700; }
.tabela .status.agendada { color: var(--dourado-elegante); font-weight: 700; }
.tabela .status.encerrada { color: var(--texto-suave); }
.mini { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; display: block; }
.mini.vazio { background: var(--creme-escuro); }
.acoes { display: flex; gap: 6px; flex-wrap: wrap; }
.acoes .btn-sec, .acoes .btn-perigo { padding: 6px 12px; font-size: 12px; }

/* Formulário de produto */
.admin-form { display: flex; flex-direction: column; gap: 16px; background: var(--branco); border-radius: 14px; padding: 24px; box-shadow: 0 2px 10px rgba(62,36,26,.07); }
.admin-form .campo { display: flex; flex-direction: column; gap: 6px; flex: 1; font-size: 13px; font-weight: 600; color: var(--marrom); }
.admin-form input:not([type="checkbox"]):not([type="file"]), .admin-form select, .admin-form textarea {
  padding: 10px 12px; border: 1px solid var(--borda); border-radius: 10px; font: inherit; font-size: 14px; background: var(--creme); width: 100%;
}
.admin-form input:not([type="checkbox"]):not([type="file"]), .admin-form select { height: 42px; }
.admin-form :is(input, select, textarea):focus { outline: 2px solid var(--dourado); border-color: transparent; }
.admin-form .linha { display: flex; gap: 16px; }
.admin-form .bloco { border: 1px solid var(--borda); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.admin-form legend { padding: 0 8px; font-weight: 700; color: var(--marrom); font-size: 14px; }
.admin-form .check { display: flex; gap: 8px; align-items: center; font-size: 14px; }
.admin-form .linha-botoes { display: flex; gap: 10px; align-items: center; }
.fotos { display: flex; flex-wrap: wrap; gap: 12px; }
.foto { width: 120px; display: flex; flex-direction: column; gap: 4px; }
.foto img { width: 120px; height: 120px; object-fit: cover; border-radius: 10px; border: 1px solid var(--borda); }
.foto button { font: inherit; font-size: 11px; padding: 4px; border: 1px solid var(--borda); border-radius: 6px; background: var(--creme); cursor: pointer; }
.foto .remover { color: #a3281d; }
.selo-principal { font-size: 11px; font-weight: 700; text-align: center; padding: 4px; border-radius: 6px; background: var(--marrom); color: var(--dourado-claro); }

@media (max-width: 900px) {
  .admin-form .linha { flex-direction: column; }
}

/* ----- Abas do painel ----- */
.admin-cabecalho { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 8px 24px; margin-bottom: 24px; border-bottom: 1px solid var(--borda); }
.admin-titulo { width: 100%; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; color: var(--texto-suave); }
.admin-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
.admin-tabs a { padding: 12px 18px; margin-bottom: -1px; border-bottom: 3px solid transparent; font-size: 14px; font-weight: 600; color: var(--texto-suave); transition: color .2s ease; }
.admin-tabs a:hover { color: var(--marrom); }
.admin-tabs a[aria-current="page"] { color: var(--marrom); border-bottom-color: var(--dourado); }
.admin-tabs-acoes { display: flex; gap: 8px; align-items: center; padding-bottom: 8px; }

/* ----- Visão geral ----- */
.cards-resumo { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 16px; margin-bottom: 28px; }
.painel-card { display: flex; flex-direction: column; gap: 4px; padding: 18px; border-radius: 14px; background: var(--branco); box-shadow: 0 2px 10px rgba(62,36,26,.07); }
.painel-card strong { font-size: 30px; line-height: 1.1; color: var(--marrom); }
.painel-card span { font-size: 13px; color: var(--texto-suave); }
.secao { margin-bottom: 32px; }
.secao h2 { margin-bottom: 6px; font-size: 18px; color: var(--marrom); }
.secao > .dica { margin-bottom: 12px; }
.avisos { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.avisos li { padding: 12px 14px; border-radius: 10px; background: #fff6df; font-size: 14px; }
.avisos a { color: var(--dourado-elegante); font-weight: 700; }

/* ----- Filtros da lista de produtos ----- */
.filtros { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 16px; }
.pill { padding: 6px 14px; border-radius: 18px; border: 1px solid var(--borda); background: var(--branco); font-size: 13px; font-weight: 600; color: var(--texto-suave); }
.pill:hover { background: var(--creme-escuro); }
.pill[aria-current="true"] { background: var(--marrom); border-color: var(--marrom); color: var(--dourado-claro); }
.busca-admin { display: flex; gap: 6px; margin-left: auto; }
.busca-admin input { height: 36px; padding: 0 14px; border: 1px solid var(--borda); border-radius: 18px; background: var(--branco); font: inherit; font-size: 13px; }
.busca-admin .btn-sec { padding: 6px 14px; }

/* ----- Criar promoção ----- */
.bloco-sel { display: flex; flex-direction: column; gap: 10px; }
.lista-selecao { max-height: 360px; overflow: auto; border: 1px solid var(--borda); border-radius: 12px; }
.item-sel { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-bottom: 1px solid var(--borda); font-size: 14px; cursor: pointer; }
.item-sel:last-child { border-bottom: 0; }
.item-sel:hover { background: var(--creme); }
.item-sel .nome { flex: 1; min-width: 0; }
.item-sel small { display: block; font-size: 12px; color: var(--texto-suave); }
.item-sel .novo-preco { font-weight: 700; color: #1f6b43; white-space: nowrap; }

@media (max-width: 900px) {
  .admin-tabs-acoes { padding-bottom: 12px; }
  .busca-admin { margin-left: 0; width: 100%; }
  .busca-admin input { flex: 1; }
}

/* ----- Busca ----- */
.busca-info { margin: 0 var(--lateral); padding: 14px 0 0; font-size: 13px; color: var(--texto-suave); }
.busca-vazio { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 48px var(--gutter) 72px; text-align: center; }

/* ----- Área de envio de fotos (arrastar / colar / clicar) ----- */
.dropzone { position: relative; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 22px 16px; border: 2px dashed var(--borda); border-radius: 12px; background: var(--creme); text-align: center; font-size: 14px; font-weight: 600; color: var(--marrom); cursor: pointer; transition: border-color .2s ease, background-color .2s ease; }
.dropzone:hover, .dropzone.arrastando { border-color: var(--dourado); background: #fff6df; }
.dropzone:focus-within { outline: 2px solid var(--dourado); outline-offset: 2px; }
.dropzone small { font-weight: 400; font-size: 12px; color: var(--texto-suave); }
.dropzone input[type="file"] { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.dropzone[aria-disabled="true"] { opacity: .6; cursor: wait; }

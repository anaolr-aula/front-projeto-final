document.addEventListener("DOMContentLoaded", () => {
    // 1. Cria e injeta o CSS global do Modo Escuro
    const style = document.createElement("style");
    style.innerHTML = `
       /* 1. FUNDOS PRINCIPAIS (--bg) */
        /* Adicionei TODOS os IDs de main que você usa nas diferentes telas */
        body.dark-theme,
        body.dark-theme main,
        body.dark-theme #content-detalhes,
        body.dark-theme #content-dashboard,
        body.dark-theme #content-perfil,
        body.dark-theme #content-cadastro,
        body.dark-theme #content-painel {
            background-color: #0f172a !important; 
            color: #f1f5f9 !important; 
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        /* 2. CARTÕES E CAIXAS (--card) */
        /* Adicionei .card-info, .item-resumo, .search-box e outros que faltavam */
        body.dark-theme header,
        body.dark-theme aside#painel,
        body.dark-theme .card,
        body.dark-theme .card-resumo,
        body.dark-theme .card-solicitacao,
        body.dark-theme .card-perfil,
        body.dark-theme .card-info,
        body.dark-theme .card-notificacao,
        body.dark-theme .faixa,
        body.dark-theme .sugestao,
        body.dark-theme .ocorrencia,
        body.dark-theme .item-resumo,
        body.dark-theme .dados,
        body.dark-theme .info,
        body.dark-theme .info-grid,
        body.dark-theme .modal-content,
        body.dark-theme .card-painel,
        body.dark-theme .box,
        body.dark-theme .grafico-box,
        body.dark-theme .sugestao-destaque-admin,
        body.dark-theme .sugestao-box,
        body.dark-theme .search-box {
            background-color: #1e293b !important; 
            border-color: #334155 !important; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.4) !important;
            transition: background-color 0.3s ease;
        }

        /* 3. CORES DOS TEXTOS ESPECÍFICOS */
        /* Garante que os títulos fortes e labels fiquem claros */
        body.dark-theme h1, body.dark-theme h2, body.dark-theme h3, body.dark-theme h4,
        body.dark-theme p, body.dark-theme span, body.dark-theme a, body.dark-theme label,
        body.dark-theme strong,
        body.dark-theme .info h3, body.dark-theme .card-painel h3,
        body.dark-theme .sugestao-destaque-admin h4,
        body.dark-theme .sugestao-destaque-admin p {
            color: #f1f5f9 !important;
        }

        /* 4. FORMULÁRIOS (Inputs, Selects e Textareas) */
        body.dark-theme input, 
        body.dark-theme select, 
        body.dark-theme textarea {
            background-color: #111827 !important;
            color: #f1f5f9 !important;
            border: 1px solid #334155 !important;
        }

        /* 5. INPUTS BLOQUEADOS (Telas de detalhes) */
        body.dark-theme input[readonly],
        body.dark-theme textarea[readonly],
        body.dark-theme select:disabled {
            background-color: #0f172a !important; 
            color: #94a3b8 !important; 
            border-color: #1e293b !important;
        }

        /* 6. CORES DE ALERTA E PRIORIDADE (Adaptadas para modo escuro) */
        /* Converte os tons pastel do modo claro para tons escuros brilhantes */
        body.dark-theme .red, body.dark-theme .prioridade-alta { background-color: #450a0a !important; color: #fca5a5 !important; border-color: #7f1d1d !important; }
        body.dark-theme .yellow, body.dark-theme .prioridade-media { background-color: #422006 !important; color: #fde047 !important; border-color: #713f12 !important; }
        body.dark-theme .green, body.dark-theme .prioridade-baixa { background-color: #052e16 !important; color: #86efac !important; border-color: #14532d !important; }
        body.dark-theme .alerta { background-color: #422006 !important; border-left-color: #f59e0b !important; color: #fde047 !important; }
        body.dark-theme .alerta span { color: #fef08a !important; }
        body.dark-theme .tag-setor-admin { background-color: #334155 !important; color: #93c5fd !important; }

        /* 7. HOVER DOS MENUS E FILTROS */
        body.dark-theme .link-menu:hover, 
        body.dark-theme .acao-item:hover,
        body.dark-theme .filtro,
        body.dark-theme .filtro:hover,
        body.dark-theme .filtro.ativo {
            background-color: #273449 !important;
            color: #f1f5f9 !important;
            border-radius: 8px;
        }

        /* 8. BOTÃO DO TEMA (Sol/Lua) */
        #btn-theme-toggle {
            background: transparent; border: none; color: inherit; font-size: 1.5rem;
            cursor: pointer; margin-left: auto; margin-right: 15px;
            transition: transform 0.3s ease, color 0.3s ease;
        }
        body.dark-theme #btn-theme-toggle { color: #3b82f6; }
        #btn-theme-toggle:hover { transform: scale(1.15) rotate(15deg); }
    `;
    document.head.appendChild(style);

    // 2. Criar o botão (Lua/Sol) e colocá-lo no header
    const header = document.querySelector("header");
    let btnToggle;

    if (header) {
        btnToggle = document.createElement("button");
        btnToggle.id = "btn-theme-toggle";
        btnToggle.title = "Alternar Tema";
        
        // Verifica na memória se o utilizador já tinha escolhido o tema escuro antes
        const temaAtual = localStorage.getItem("temaSIGOS");
        if (temaAtual === "dark") {
            btnToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            btnToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

        // Tenta inserir o botão antes do botão hamburguer (para ficar organizado)
        const btnHamburguer = document.getElementById("btn-hamburguer");
        if (btnHamburguer) {
            header.insertBefore(btnToggle, btnHamburguer);
        } else {
            // Se não houver hamburguer (ex: ecrã grande), adiciona no fim do header
            header.appendChild(btnToggle);
        }
    }

    // 3. Função que liga/desliga o modo escuro
    function aplicarTema(tema) {
        if (tema === "dark") {
            document.body.classList.add("dark-theme");
            if (btnToggle) btnToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem("temaSIGOS", "dark"); // Guarda na memória do browser
        } else {
            document.body.classList.remove("dark-theme");
            if (btnToggle) btnToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem("temaSIGOS", "light"); // Guarda na memória do browser
        }
    }

    // 4. Carrega o estado inicial mal a página abre
    const temaSalvo = localStorage.getItem("temaSIGOS");
    if (temaSalvo === "dark") {
        aplicarTema("dark");
    }

    // 5. O que acontece quando clica no botão
    if (btnToggle) {
        btnToggle.addEventListener("click", () => {
            const temaAtual = document.body.classList.contains("dark-theme") ? "dark" : "light";
            // Se está dark, muda para light. Se está light, muda para dark.
            aplicarTema(temaAtual === "dark" ? "light" : "dark");
        });
    }
});
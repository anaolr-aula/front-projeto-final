document.addEventListener("DOMContentLoaded", () => {
    // 1. Cria e injeta o CSS do Menu Hamburguer dinamicamente
    const style = document.createElement("style");
    style.innerHTML = `
        /* Estilo do botão Hamburguer no Header */
        #btn-hamburguer {
            display: none;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
            margin-left: auto; /* Empurra o botão para o canto direito */
            padding: 5px;
        }

        /* Estilo do Fundo Escuro (Overlay) */
        #overlay-menu {
            display: none;
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.6);
            z-index: 998;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        /* Botão de Fechar o menu (X) */
        #btn-fechar-menu {
            display: none;
            position: absolute;
            top: 15px;
            right: 20px;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.8rem;
            cursor: pointer;
        }

        /* Regras exclusivas para telas de celular e tablet */
        @media (max-width: 768px) {
            #btn-hamburguer {
                display: block;
            }

            #btn-fechar-menu {
                display: block;
            }

            /* Transforma o painel num menu lateral flutuante */
            #painel {
                position: fixed !important;
                top: 0;
                left: 0;
                height: 100vh !important;
                width: 260px !important;
                z-index: 999;
                transform: translateX(-100%); /* Esconde fora da tela */
                transition: transform 0.3s ease;
                margin: 0 !important;
            }

            /* Classe que será ativada pelo JS para mostrar o menu */
            #painel.menu-aberto {
                transform: translateX(0);
            }

            /* Quando o overlay estiver ativo */
            #overlay-menu.ativo {
                display: block;
                opacity: 1;
            }

            /* Corrige a foto e nome para ficarem em coluna no menu aberto */
            #usuario {
                flex-direction: column !important;
                margin-top: 30px;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Cria e injeta a camada escura (Overlay) no body
    const overlay = document.createElement("div");
    overlay.id = "overlay-menu";
    document.body.appendChild(overlay);

    // 3. Procura o Header e injeta o botão Hamburguer
    const header = document.querySelector("header");
    let btnHamburguer;
    
    if (header) {
        btnHamburguer = document.createElement("button");
        btnHamburguer.id = "btn-hamburguer";
        btnHamburguer.innerHTML = '<i class="fa-solid fa-bars"></i>';
        header.appendChild(btnHamburguer);
    }

    // 4. Procura o Painel Lateral e injeta o botão de Fechar (X)
    const painel = document.getElementById("painel");
    let btnFechar;

    if (painel) {
        btnFechar = document.createElement("button");
        btnFechar.id = "btn-fechar-menu";
        btnFechar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        painel.insertBefore(btnFechar, painel.firstChild); // Adiciona no topo do painel
    }

    // 5. Lógica de Abrir e Fechar
    function abrirMenu() {
        if (painel) painel.classList.add("menu-aberto");
        overlay.classList.add("ativo");
        document.body.style.overflow = "hidden"; // Impede o scroll da tela atrás do menu
    }

    function fecharMenu() {
        if (painel) painel.classList.remove("menu-aberto");
        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto"; // Libera o scroll
    }

    // Adiciona os eventos de clique
    if (btnHamburguer) btnHamburguer.addEventListener("click", abrirMenu);
    if (btnFechar) btnFechar.addEventListener("click", fecharMenu);
    overlay.addEventListener("click", fecharMenu); // Fecha se clicar fora do menu
});
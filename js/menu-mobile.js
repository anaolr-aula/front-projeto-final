document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------
    // 1. INJEÇÃO DE CSS (Menu Mobile + Menu Ativo)
    // --------------------------------------------------------
    const style = document.createElement("style");
   const style = document.createElement("style");
    style.innerHTML = `
        /* Estilo do botão Hamburguer no Header */
        #btn-hamburguer { display: none; background: transparent; border: none; color: white; font-size: 1.8rem; cursor: pointer; margin-left: auto; padding: 5px; }
        
        /* OVERLAY - Fundo escuro fixo (Forçado a cobrir tudo no iPhone) */
        #overlay-menu { 
            display: none; 
            position: fixed !important; 
            top: 0 !important; 
            left: 0 !important; 
            right: 0 !important; 
            bottom: 0 !important; 
            height: 100% !important;
            width: 100% !important;
            background: rgba(0,0,0,0.6); 
            z-index: 9998 !important; 
            opacity: 0; 
            transition: opacity 0.3s ease; 
        }

        #btn-fechar-menu { display: none; position: absolute; top: 15px; right: 20px; background: transparent; border: none; color: white; font-size: 1.8rem; cursor: pointer; }

        /* Estilo para a página atual (Menu Ativo) */
        .link-menu.ativo {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding-left: 10px;
            border-left: 4px solid #f1c40f;
            transition: all 0.3s ease;
        }

        @media (max-width: 768px) {
            #btn-hamburguer { display: block; }
            #btn-fechar-menu { display: block; }
            
            /* MENU LATERAL - Correção do Flutuante e do Scroll no iPhone */
            #painel { 
                position: fixed !important; 
                top: 0 !important; 
                bottom: 0 !important; /* Prende o menu firmemente na base da tela */
                left: 0 !important; 
                height: 100% !important; /* Força a ocupar a tela inteira */
                max-height: 100vh !important;
                width: 260px !important; 
                z-index: 9999 !important; 
                transform: translateX(-100%); 
                transition: transform 0.3s ease; 
                margin: 0 !important; 
                
                /* O Segredo do Scroll Nativo no iPhone */
                overflow-y: auto !important; 
                -webkit-overflow-scrolling: touch !important; /* Permite rolar com o dedo suavemente */
                overscroll-behavior-y: contain !important; /* Impede que a página de trás role por acidente */
                
                padding-bottom: 80px !important; /* Espaço generoso abaixo do botão de logout */
            }
            
            #painel.menu-aberto { transform: translateX(0); }
            #overlay-menu.ativo { display: block !important; opacity: 1; }
            #usuario { flex-direction: column !important; margin-top: 30px; }
        }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "overlay-menu";
    document.body.appendChild(overlay);

    const header = document.querySelector("header");
    let btnHamburguer;
    if (header) {
        btnHamburguer = document.createElement("button");
        btnHamburguer.id = "btn-hamburguer";
        btnHamburguer.innerHTML = '<i class="fa-solid fa-bars"></i>';
        header.appendChild(btnHamburguer);
    }

    const painel = document.getElementById("painel");
    let btnFechar;
    if (painel) {
        btnFechar = document.createElement("button");
        btnFechar.id = "btn-fechar-menu";
        btnFechar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        painel.insertBefore(btnFechar, painel.firstChild);
    }

    function abrirMenu() {
        if (painel) painel.classList.add("menu-aberto");
        overlay.classList.add("ativo");
        document.body.style.overflow = "hidden";
    }

    function fecharMenu() {
        if (painel) painel.classList.remove("menu-aberto");
        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto";
    }

    if (btnHamburguer) btnHamburguer.addEventListener("click", abrirMenu);
    if (btnFechar) btnFechar.addEventListener("click", fecharMenu);
    overlay.addEventListener("click", fecharMenu);


    // --------------------------------------------------------
    // 2. LÓGICA DE MENU ATIVO (Highlight da página atual)
    // --------------------------------------------------------
    const linksMenu = document.querySelectorAll(".link-menu a");
    const urlAtual = window.location.pathname.split("/").pop(); // Pega o nome do arquivo atual (ex: dashboard-admin.html)

    linksMenu.forEach(link => {
        const hrefDoLink = link.getAttribute("href").replace("./", "");
        if (hrefDoLink === urlAtual) {
            link.parentElement.classList.add("ativo"); // Adiciona a classe na div pai (.link-menu)
        }
    });

    // --------------------------------------------------------
    // 3. LÓGICA DE LOGOUT SEGURO
    // --------------------------------------------------------
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        // Remove o redirecionamento HTML direto para podermos limpar os dados antes
        btnLogout.removeAttribute("onclick");
        
        btnLogout.addEventListener("click", () => {
            // Apaga a sessão da memória
            localStorage.removeItem("usuarioLogado");
            // Redireciona para o login
            window.location.href = "../pages/login.html";
        });
    }
});
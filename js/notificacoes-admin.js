document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");
    const resumoNaoLidas = document.getElementById("resumo-nao-lidas");
    const btnMarcarLidas = document.getElementById("btn-marcar-lidas");
    const listaNotificacoes = document.getElementById("lista-notificacoes");

    const usuarioString = localStorage.getItem("usuarioLogado");
    if (!usuarioString) {
        window.location.href = "./login.html";
    }
    const admin = JSON.parse(usuarioString);

    const notificacoesMock = [
        {
            id: 1,
            tipo: "usuario",
            titulo: "Novo usuário cadastrado",
            mensagem: 'O usuário <strong>"Mariana Alves"</strong> foi cadastrado com perfil de <strong>Funcionário</strong> no setor <strong>Administrativo</strong>.',
            data: "13/04/2026 - 09:00",
            lida: false,
            link: "./cadastro-usuario.html",
            icone: "fa-user-plus"
        },
        {
            id: 2,
            tipo: "ocorrencia",
            titulo: "Nova ocorrência registrada",
            mensagem: 'Foi registrada a ocorrência <strong>"Computador não liga"</strong> com setor de origem <strong>RH</strong> e setor responsável <strong>TI</strong>.',
            data: "13/04/2026 - 09:20",
            lida: false,
            link: "./detalhe-ocorrencia.html",
            icone: "fa-triangle-exclamation"
        },
        {
            id: 3,
            tipo: "sugestao",
            titulo: "Nova sugestão enviada",
            mensagem: 'A sugestão <strong>"Melhorar iluminação do corredor"</strong> foi enviada para o setor <strong>Administrativo</strong>.',
            data: "13/04/2026 - 10:40",
            lida: false,
            link: "./detalhe-sugestao.html",
            icone: "fa-lightbulb"
        },
        {
            id: 4,
            tipo: "sistema",
            titulo: "Sugestão aprovada",
            mensagem: 'A sugestão <strong>"Criar quadro de avisos"</strong> foi aprovada pelo gestor responsável.',
            data: "13/04/2026 - 11:10",
            lida: true,
            link: "./detalhe-sugestao.html",
            icone: "fa-circle-check"
        },
        {
            id: 5,
            tipo: "sistema",
            titulo: "Ocorrência concluída",
            mensagem: 'A ocorrência <strong>"Impressora travando"</strong> foi marcada como <strong>Concluída</strong>.',
            data: "13/04/2026 - 11:35",
            lida: true,
            link: "./detalhe-ocorrencia.html",
            icone: "fa-check-double"
        }
    ];

    nomeSidebar.textContent = admin.nome;

    function atualizarResumo() {
        const totalNaoLidas = notificacoesMock.filter(n => !n.lida).length;
        resumoNaoLidas.textContent = `Você tem ${totalNaoLidas} notificação(ões) não lida(s)`;
    }

    function renderizarNotificacoes() {
        listaNotificacoes.innerHTML = "";

        notificacoesMock.forEach((notificacao) => {
            const article = document.createElement("article");
            article.className = `card-notificacao ${notificacao.lida ? "lida" : "nao-lida"} ${notificacao.tipo}`;

            article.innerHTML = `
                <div class="icone-notificacao">
                    <i class="fa-solid ${notificacao.icone}"></i>
                </div>

                <div class="conteudo-notificacao">
                    <div class="linha-topo">
                        <span class="tipo">${notificacao.titulo}</span>
                        <span class="data">${notificacao.data}</span>
                    </div>

                    <p>${notificacao.mensagem}</p>

                    <a href="${notificacao.link}" class="btn-detalhes" data-id="${notificacao.id}">
                        Ver detalhes
                    </a>
                </div>
            `;

            listaNotificacoes.appendChild(article);
        });

        atualizarResumo();
        adicionarEventosDetalhes();
    }

    function adicionarEventosDetalhes() {
        const links = document.querySelectorAll(".btn-detalhes");

        links.forEach((link) => {
            link.addEventListener("click", (event) => {
                const id = Number(event.target.dataset.id);
                const notificacao = notificacoesMock.find(n => n.id === id);

                if (notificacao) {
                    notificacao.lida = true;
                    atualizarResumo();
                }
            });
        });
    }

    btnMarcarLidas.addEventListener("click", () => {
        notificacoesMock.forEach((n) => {
            n.lida = true;
        });

        renderizarNotificacoes();
    });

    renderizarNotificacoes();
});
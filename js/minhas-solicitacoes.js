document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");
    const lista = document.getElementById("lista-solicitacoes");
    const filtros = document.querySelectorAll(".filtro");

    const usuario = {
        nome: "Mariana Alves"
    };

    const solicitacoes = [
        {
            id: 1,
            tipo: "ocorrencia",
            titulo: "Computador não liga",
            descricao: "Ao ligar o computador da sala 03 ele permanece com a tela preta.",
            status: "andamento",
            data: "13/04/2026",
            setor: "TI"
        },
        {
            id: 2,
            tipo: "sugestao",
            titulo: "Melhorar iluminação do corredor",
            descricao: "Seria interessante instalar novas lâmpadas no corredor principal.",
            status: "em-analise",
            data: "12/04/2026",
            setor: "Administrativo"
        },
        {
            id: 3,
            tipo: "ocorrencia",
            titulo: "Impressora travando",
            descricao: "A impressora do setor administrativo trava ao imprimir mais de 5 páginas.",
            status: "concluida",
            data: "10/04/2026",
            setor: "TI"
        },
        {
            id: 4,
            tipo: "sugestao",
            titulo: "Criar quadro de avisos",
            descricao: "Um quadro de avisos ajudaria na comunicação entre os funcionários.",
            status: "aprovada",
            data: "08/04/2026",
            setor: "Administrativo"
        }
    ];

    nomeSidebar.textContent = usuario.nome;

    function formatarStatus(status) {
        const mapa = {
            "aberta": "Aberta",
            "enviada": "Enviada",
            "andamento": "Em andamento",
            "em-analise": "Em análise",
            "concluida": "Concluída",
            "aprovada": "Aprovada",
            "rejeitada": "Rejeitada"
        };

        return mapa[status];
    }

    function renderizar(tipo = "todas") {
        lista.innerHTML = "";

        const filtradas = tipo === "todas"
            ? solicitacoes
            : solicitacoes.filter(item => item.tipo === tipo);

        if (filtradas.length === 0) {
            lista.innerHTML = `
                <div class="card-solicitacao">
                    <div class="info-solicitacao">
                        <h3>Nenhuma solicitação encontrada</h3>
                        <p>Não existem itens para este filtro.</p>
                    </div>
                </div>
            `;
            return;
        }

        filtradas.forEach((item) => {
            const card = document.createElement("article");
            card.className = `card-solicitacao ${item.tipo}`;

            const destino = item.tipo === "ocorrencia"
                ? `./detalhe-ocorrencia.html?id=${item.id}`
                : `./detalhe-sugestao.html?id=${item.id}`;

            card.innerHTML = `
                <div class="info-solicitacao">
                    <div class="tipo">
                        ${item.tipo === "ocorrencia" ? "Ocorrência" : "Sugestão"}
                    </div>

                    <h3>${item.titulo}</h3>

                    <p>${item.descricao}</p>

                    <div class="meta">
                        <span><strong>Setor:</strong> ${item.setor}</span>
                        <span><strong>Data:</strong> ${item.data}</span>
                        <span class="status ${item.status}">
                            ${formatarStatus(item.status)}
                        </span>
                    </div>
                </div>

                <div class="acoes">
                    <a href="${destino}" class="btn-detalhes">
                        Ver detalhes
                    </a>
                </div>
            `;

            lista.appendChild(card);
        });
    }

    filtros.forEach((botao) => {
        botao.addEventListener("click", () => {
            filtros.forEach(btn => btn.classList.remove("ativo"));
            botao.classList.add("ativo");

            renderizar(botao.dataset.filtro);
        });
    });

    renderizar();
});
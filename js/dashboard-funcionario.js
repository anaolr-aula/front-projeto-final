document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");
    const nomeUsuario = document.getElementById("nome-usuario");

    const ocorrenciasAbertas = document.getElementById("ocorrencias-abertas");
    const ocorrenciasAndamento = document.getElementById("ocorrencias-andamento");
    const sugestoesEnviadas = document.getElementById("sugestoes-enviadas");
    const sugestoesAprovadas = document.getElementById("sugestoes-aprovadas");
    const listaAtividades = document.getElementById("lista-atividades");
    const listaSugestoesDestaque = document.getElementById("lista-sugestoes-destaque");

    const usuarioString = localStorage.getItem("usuarioLogado");

    if (!usuarioString) {
        window.location.href = "./login.html";
        return;
    }

    const funcionarioMock = JSON.parse(usuarioString);

    const dashboardMock = {
        ocorrencias_abertas: 2,
        ocorrencias_andamento: 1,
        sugestoes_enviadas: 3,
        sugestoes_aprovadas: 1,
        atividades: [
            {
                tipo: "ocorrencia",
                mensagem: 'Você registrou a ocorrência "Computador não liga".',
                data: "13/04/2026 - 09:15"
            },
            {
                tipo: "sugestao",
                mensagem: 'Sua sugestão "Melhorar iluminação do corredor" está em análise.',
                data: "13/04/2026 - 10:40"
            },
            {
                tipo: "sugestao",
                mensagem: 'Sua sugestão "Criar quadro de avisos" foi aprovada.',
                data: "13/04/2026 - 11:10"
            }
        ]
    };

    const sugestoesDestaqueMock = [
        {
            id: 1,
            titulo: "Adicionar micro-ondas na copa",
            descricao: "Muitos funcionários almoçam na empresa e atualmente existe apenas um micro-ondas para todo o andar.",
            setor: "Administrativo",
            votos: 23
        },
        {
            id: 2,
            titulo: "Melhorar a rede Wi-Fi",
            descricao: "A internet cai com frequência no segundo andar e isso atrapalha o trabalho da equipe.",
            setor: "TI",
            votos: 17
        }
    ];

    let votosUsuario = JSON.parse(localStorage.getItem("votosSugestoes")) || [];

    function preencherDashboard() {
        nomeSidebar.textContent = funcionarioMock.nome;
        nomeUsuario.textContent = funcionarioMock.nome;

        ocorrenciasAbertas.textContent = dashboardMock.ocorrencias_abertas;
        ocorrenciasAndamento.textContent = dashboardMock.ocorrencias_andamento;
        sugestoesEnviadas.textContent = dashboardMock.sugestoes_enviadas;
        sugestoesAprovadas.textContent = dashboardMock.sugestoes_aprovadas;

        listaAtividades.innerHTML = "";

        dashboardMock.atividades.forEach((atividade) => {
            const div = document.createElement("div");
            div.classList.add("atividade-item");

            div.innerHTML = `
                <p><strong>${atividade.tipo === "ocorrencia" ? "Ocorrência" : "Sugestão"}:</strong> ${atividade.mensagem}</p>
                <span>${atividade.data}</span>
            `;

            listaAtividades.appendChild(div);
        });
    }

    function renderizarSugestoesDestaque() {
        if (!listaSugestoesDestaque) return;

        listaSugestoesDestaque.innerHTML = "";

        sugestoesDestaqueMock.forEach((sugestao) => {
            const jaVotou = votosUsuario.includes(sugestao.id);

            const article = document.createElement("article");
            article.classList.add("sugestao-card");

            article.innerHTML = `
                <div class="sugestao-topo">
                    <span class="tag-setor">${sugestao.setor}</span>
                    <span class="votos">
                        <i class="fa-solid fa-thumbs-up"></i>
                        ${sugestao.votos}
                    </span>
                </div>

                <h3>${sugestao.titulo}</h3>

                <p>${sugestao.descricao}</p>

                <div class="acoes-sugestao">
                    <button class="btn-votar ${jaVotou ? "votado" : ""}" data-id="${sugestao.id}">
                        <i class="fa-solid ${jaVotou ? "fa-check" : "fa-thumbs-up"}"></i>
                        ${jaVotou ? "Votado" : "Apoiar sugestão"}
                    </button>
                </div>
            `;

            listaSugestoesDestaque.appendChild(article);
        });

        adicionarEventosVoto();
    }

    function adicionarEventosVoto() {
        const botoesVoto = document.querySelectorAll(".btn-votar");

        botoesVoto.forEach((botao) => {
            botao.addEventListener("click", () => {
                if (botao.classList.contains("votado")) return;

                const idSugestao = Number(botao.dataset.id);
                const sugestao = sugestoesDestaqueMock.find(item => item.id === idSugestao);

                if (!sugestao) return;

                sugestao.votos += 1;
                votosUsuario.push(idSugestao);

                localStorage.setItem("votosSugestoes", JSON.stringify(votosUsuario));

                renderizarSugestoesDestaque();
            });
        });
    }

    preencherDashboard();
    renderizarSugestoesDestaque();
});
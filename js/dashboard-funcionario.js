document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");
    const nomeUsuario = document.getElementById("nome-usuario");

    const ocorrenciasAbertas = document.getElementById("ocorrencias-abertas");
    const ocorrenciasAndamento = document.getElementById("ocorrencias-andamento");
    const sugestoesEnviadas = document.getElementById("sugestoes-enviadas");
    const sugestoesAprovadas = document.getElementById("sugestoes-aprovadas");
    const listaAtividades = document.getElementById("lista-atividades");

    const usuarioString = localStorage.getItem("usuarioLogado");
    if (!usuarioString) {
        window.location.href = "./login.html";
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

    preencherDashboard();
});
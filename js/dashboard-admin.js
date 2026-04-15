const dados = {
  ocorrencias: {
    alta: 12,
    media: 8,
    baixa: 1
  },
  info: {
    tempo: "2 dias",
    setor: "Produção",
    responsavel: "Carlos Silva"
  },
  alerta: {
    setor: "Produção",
    local: "Fábrica 1",
    prioridade: "Alta"
  },
  resumo: {
    criticas: 2,
    andamento: 23,
    abertas: 150,
    resolvidas: 75
  }
};

function atualizarDashboard() {
  document.getElementById("alta").innerText = dados.ocorrencias.alta;
  document.getElementById("media").innerText = dados.ocorrencias.media;
  document.getElementById("baixa").innerText = dados.ocorrencias.baixa;

  document.getElementById("tempo").innerText = dados.info.tempo;
  document.getElementById("setor").innerText = dados.info.setor;
  document.getElementById("responsavel").innerText = dados.info.responsavel;

  document.getElementById("alertaSetor").innerText = dados.alerta.setor;
  document.getElementById("alertaLocal").innerText = dados.alerta.local;
  document.getElementById("alertaPrioridade").innerText = dados.alerta.prioridade;

  document.getElementById("criticas").innerText = dados.resumo.criticas + " Críticas";
  document.getElementById("andamento").innerText = dados.resumo.andamento + " Em andamento";
  document.getElementById("abertas").innerText = dados.resumo.abertas + " Abertas";
  document.getElementById("resolvidas").innerText = dados.resumo.resolvidas + " Resolvidas";
}

let grafico = null;

function criarGrafico() {
  const ctx = document.getElementById("graficoPizza");

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Alta", "Média", "Baixa"],
      datasets: [{
        data: [
          dados.ocorrencias.alta,
          dados.ocorrencias.media,
          dados.ocorrencias.baixa
        ],
        backgroundColor: [
          "#f5b5b5",
          "#fff1b8",
          "#c8f0d2"
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#333",
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

function iniciar() {
  const usuarioString = localStorage.getItem("usuarioLogado");
  if (!usuarioString) window.location.href = "./login.html";
  const admin = JSON.parse(usuarioString);
  
  const nomeSidebar = document.getElementById("nome-sidebar");
  if (nomeSidebar) nomeSidebar.textContent = admin.nome;

  atualizarDashboard();
  criarGrafico();
}

document.addEventListener("DOMContentLoaded", iniciar);
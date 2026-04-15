document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");

    const usuarioString = localStorage.getItem("usuarioLogado");
    if (!usuarioString) {
        window.location.href = "./login.html";
    }
    const gestor = JSON.parse(usuarioString);

    // Atualiza o nome no menu lateral
    if (nomeSidebar) nomeSidebar.textContent = gestor.nome;

    // Lógica dos cards que já tinha feito
    const cards = document.querySelectorAll(".card-resumo[data-filtro]");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const filtro = card.dataset.filtro;
            window.location.href = `./painel-solicitacoes-gestor.html?prioridade=${filtro}`;
        });
    });
});
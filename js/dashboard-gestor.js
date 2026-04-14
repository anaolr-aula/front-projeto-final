document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card-resumo[data-filtro]");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            const filtro = card.dataset.filtro;

            window.location.href =
                `./painel-solicitacoes-gestor.html?prioridade=${filtro}`;
        });
    });
});
const form = document.getElementById("form-login");
const mensagem = document.getElementById("mensagem-login");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const matricula = document.getElementById("matricula").value.trim();
    const senha = document.getElementById("senha").value.trim();

    mensagem.textContent = "";

    try {
        let usuarioLogado = null;

        if (matricula === "111" && senha === "123") {
            usuarioLogado = { nome: "Mariana Alves", perfil: "funcionario", setor: "Administrativo" };
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            window.location.href = "./dashboard-funcionario.html";
            return;
        }

        if (matricula === "222" && senha === "123") {
            usuarioLogado = { nome: "Carlos Souza", perfil: "gestor", setor: "TI" };
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            window.location.href = "./dashboard-gestor.html"; // Criaremos esta página depois
            return;
        }

        if (matricula === "333" && senha === "123") {
            usuarioLogado = { nome: "Fernanda Costa", perfil: "admin", setor: "TI" };
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            window.location.href = "./dashboard-admin.html"; // Criaremos esta página depois
            return;
        }

        mensagem.textContent = "Matrícula ou senha inválidas.";
    } catch (error) {
        mensagem.textContent = "Erro ao tentar fazer login.";
        console.error(error);
    }
});
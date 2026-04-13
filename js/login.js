const form = document.getElementById("form-login");
const mensagem = document.getElementById("mensagem-login");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const matricula = document.getElementById("matricula").value.trim();
    const senha = document.getElementById("senha").value.trim();

    mensagem.textContent = "";

    try {
        // Exemplo temporário até conectar no backend
        if (!matricula || !senha) {
            mensagem.textContent = "Preencha todos os campos.";
            return;
        }

        // Simulação
        if (matricula === "111" && senha === "123") {
            window.location.href = "./dashboard-funcionario.html";
            return;
        }

        if (matricula === "222" && senha === "123") {
            window.location.href = "./dashboard-gestor.html";
            return;
        }

        if (matricula === "333" && senha === "123") {
            window.location.href = "./dashboard-admin.html";
            return;
        }

        mensagem.textContent = "Matrícula ou senha inválidas.";
    } catch (error) {
        mensagem.textContent = "Erro ao tentar fazer login.";
        console.error(error);
    }
});
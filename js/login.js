document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------------
    // 1. LÓGICA DE AUTO-LOGIN
    // --------------------------------------------------------
    const usuarioString = localStorage.getItem("usuarioLogado");
    if (usuarioString) {
        const usuarioLogado = JSON.parse(usuarioString);
        if (usuarioLogado.perfil === "funcionario") window.location.href = "./dashboard-funcionario.html";
        if (usuarioLogado.perfil === "gestor") window.location.href = "./dashboard-gestor.html";
        if (usuarioLogado.perfil === "admin") window.location.href = "./dashboard-admin.html";
    }

    // --------------------------------------------------------
    // 2. LÓGICA DE VISUALIZAR SENHA
    // --------------------------------------------------------
    const toggleSenha = document.getElementById("toggle-senha");
    const inputSenha = document.getElementById("senha");

    if (toggleSenha && inputSenha) {
        toggleSenha.addEventListener("click", () => {
            // Troca de 'password' para 'text' e vice-versa
            const tipo = inputSenha.getAttribute("type") === "password" ? "text" : "password";
            inputSenha.setAttribute("type", tipo);
            
            // Troca o ícone do olho
            toggleSenha.classList.toggle("fa-eye");
            toggleSenha.classList.toggle("fa-eye-slash");
        });
    }

    // --------------------------------------------------------
    // 3. LÓGICA DE LOGIN NORMAL
    // --------------------------------------------------------
    const form = document.getElementById("form-login");
    const mensagem = document.getElementById("mensagem-login");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const matricula = document.getElementById("matricula").value.trim();
            const senha = inputSenha.value.trim();

            mensagem.textContent = "";

            try {
                let usuarioNovo = null;

                if (matricula === "111" && senha === "123") {
                    usuarioNovo = { nome: "Mariana Alves", perfil: "funcionario", setor: "Administrativo" };
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioNovo));
                    window.location.href = "./dashboard-funcionario.html";
                    return;
                }

                if (matricula === "222" && senha === "123") {
                    usuarioNovo = { nome: "Carlos Souza", perfil: "gestor", setor: "TI" };
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioNovo));
                    window.location.href = "./dashboard-gestor.html"; 
                    return;
                }

                if (matricula === "333" && senha === "123") {
                    usuarioNovo = { nome: "Fernanda Costa", perfil: "admin", setor: "TI" };
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioNovo));
                    window.location.href = "./dashboard-admin.html"; 
                    return;
                }

                mensagem.textContent = "Matrícula ou senha inválidas.";
            } catch (error) {
                mensagem.textContent = "Erro ao tentar fazer login.";
                console.error(error);
            }
        });
    }
});
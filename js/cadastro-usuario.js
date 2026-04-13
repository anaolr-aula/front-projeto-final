document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");
    const btnCancelar = document.getElementById("btn-cancelar");
    const mensagem = document.getElementById("mensagem-cadastro");
    const form = document.getElementById("form-cadastro-usuario");

    const campos = {
        nome: document.getElementById("nome"),
        email: document.getElementById("email"),
        matricula: document.getElementById("matricula"),
        cargo: document.getElementById("cargo"),
        setor: document.getElementById("setor"),
        tipoUsuario: document.getElementById("tipo_usuario"),
        senha: document.getElementById("senha"),
        confirmarSenha: document.getElementById("confirmar_senha")
    };

    const adminMock = {
        nome: "Fernanda Costa"
    };

    nomeSidebar.textContent = adminMock.nome;

    function limparFormulario() {
        form.reset();
        mensagem.textContent = "";
        mensagem.style.color = "#d62828";
    }

    function validarFormulario() {
        if (!campos.nome.value.trim()) {
            mensagem.textContent = "Informe o nome completo.";
            campos.nome.focus();
            return false;
        }

        if (!campos.email.value.trim()) {
            mensagem.textContent = "Informe o e-mail.";
            campos.email.focus();
            return false;
        }

        if (!campos.matricula.value.trim()) {
            mensagem.textContent = "Informe a matrícula.";
            campos.matricula.focus();
            return false;
        }

        if (!campos.cargo.value.trim()) {
            mensagem.textContent = "Informe o cargo.";
            campos.cargo.focus();
            return false;
        }

        if (!campos.setor.value) {
            mensagem.textContent = "Selecione o setor.";
            campos.setor.focus();
            return false;
        }

        if (!campos.tipoUsuario.value) {
            mensagem.textContent = "Selecione o tipo de usuário.";
            campos.tipoUsuario.focus();
            return false;
        }

        if (!campos.senha.value.trim()) {
            mensagem.textContent = "Informe a senha.";
            campos.senha.focus();
            return false;
        }

        if (campos.senha.value.length < 6) {
            mensagem.textContent = "A senha deve ter pelo menos 6 caracteres.";
            campos.senha.focus();
            return false;
        }

        if (campos.senha.value !== campos.confirmarSenha.value) {
            mensagem.textContent = "As senhas não coincidem.";
            campos.confirmarSenha.focus();
            return false;
        }

        return true;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        mensagem.textContent = "";

        if (!validarFormulario()) return;

        const payload = {
            nome: campos.nome.value.trim(),
            email: campos.email.value.trim(),
            matricula: campos.matricula.value.trim(),
            cargo: campos.cargo.value.trim(),
            setor: campos.setor.value,
            tipo_usuario: campos.tipoUsuario.value,
            senha: campos.senha.value,
            status: "ativo"
        };

        try {
            console.log("Enviando para backend:", payload);

            // Futuro:
            // await fetch('/usuarios', {...})

            mensagem.style.color = "green";
            mensagem.textContent = "Usuário cadastrado com sucesso.";
            form.reset();
        } catch (erro) {
            mensagem.style.color = "#d62828";
            mensagem.textContent = "Erro ao cadastrar usuário.";
            console.error(erro);
        }
    });

    btnCancelar.addEventListener("click", limparFormulario);
});
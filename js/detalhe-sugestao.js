document.addEventListener("DOMContentLoaded", () => {
    const nomeSidebar = document.getElementById("nome-sidebar");

    const campos = {
        titulo: document.getElementById("titulo"),
        descricao: document.getElementById("descricao"),
        setorOrigem: document.getElementById("setor_origem"),
        beneficioEsperado: document.getElementById("beneficio_esperado"),
        autor: document.getElementById("autor"),
        dataEnvio: document.getElementById("data_envio"),
        votos: document.getElementById("votos"),
        status: document.getElementById("status"),
        parecerGestor: document.getElementById("parecer_gestor"),
        mensagem: document.getElementById("mensagem-sugestao"),
        form: document.getElementById("form-sugestao")
    };

    // Mock temporário até conectar com o backend
    const gestor = {
        nome: "Carlos Souza",
        setor: "TI"
    };

    const sugestao = {
        id: 9,
        titulo: "Melhorar iluminação do corredor",
        descricao: "Instalar mais pontos de luz no corredor lateral para aumentar a visibilidade e a segurança.",
        setor_origem: "Administrativo",
        beneficio_esperado: "Melhor visibilidade, mais conforto e mais segurança para circulação.",
        autor: "Mariana Alves",
        data_envio: "13/04/2026 às 10:40",
        votos: 12,
        status: "em_analise",
        parecer_gestor: "Sugestão em avaliação junto à equipe de infraestrutura."
    };

    function preencherTela() {
        nomeSidebar.textContent = gestor.nome;

        campos.titulo.value = sugestao.titulo;
        campos.descricao.value = sugestao.descricao;
        campos.setorOrigem.value = sugestao.setor_origem;
        campos.beneficioEsperado.value = sugestao.beneficio_esperado;
        campos.autor.value = sugestao.autor;
        campos.dataEnvio.value = sugestao.data_envio;
        campos.votos.value = `${sugestao.votos} voto(s)`;
        campos.status.value = sugestao.status;
        campos.parecerGestor.value = sugestao.parecer_gestor;
    }

    function validarFormulario() {
        if (!campos.status.value) {
            campos.mensagem.textContent = "Selecione um status.";
            campos.mensagem.style.color = "#d62828";
            return false;
        }

        return true;
    }

    campos.form.addEventListener("submit", async (event) => {
        event.preventDefault();

        campos.mensagem.textContent = "";

        if (!validarFormulario()) return;

        const payload = {
            id: sugestao.id,
            status: campos.status.value,
            parecer_gestor: campos.parecerGestor.value.trim()
        };

        try {
            console.log("Enviando para backend:", payload);

            // Futuro:
            // await fetch(`/sugestoes/${sugestao.id}`, {...})

            campos.mensagem.style.color = "green";
            campos.mensagem.textContent = "Alterações salvas com sucesso.";
        } catch (erro) {
            campos.mensagem.style.color = "#d62828";
            campos.mensagem.textContent = "Erro ao salvar alterações.";
            console.error(erro);
        }
    });

    preencherTela();
});
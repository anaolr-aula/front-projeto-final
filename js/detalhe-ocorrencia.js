// detalhe-ocorrencia.js

document.addEventListener("DOMContentLoaded", () => {
  const nomeSidebar = document.getElementById("nome-sidebar");

  const campos = {
      titulo: document.getElementById("titulo"),
      descricao: document.getElementById("descricao"),
      categoria: document.getElementById("categoria"),
      setorOrigem: document.getElementById("setor_origem"),
      setorResponsavel: document.getElementById("setor_responsavel"),
      local: document.getElementById("local"),
      urgencia: document.getElementById("urgencia"),
      autor: document.getElementById("autor"),
      dataEnvio: document.getElementById("data_envio"),
      status: document.getElementById("status"),
      prioridade: document.getElementById("prioridade"),
      observacao: document.getElementById("observacao_gestor"),
      anexo: document.getElementById("preview-anexo"),
      mensagem: document.getElementById("mensagem-ocorrencia"),
      form: document.getElementById("form-ocorrencia")
  };

  // Mock temporário até conectar com o backend
  const gestor = {
      nome: "Carlos Souza",
      setor: "TI"
  };

  const ocorrencia = {
      id: 15,
      titulo: "Computador não liga",
      descricao: "O computador do RH parou de funcionar desde ontem e não está ligando.",
      categoria: "Tecnologia",
      setor_origem: "RH",
      setor_responsavel: "TI",
      local: "Sala 03 - RH",
      urgencia: "Alta",
      autor: "Maria Oliveira",
      data_envio: "13/04/2026 às 09:15",
      anexo: "../imagens/exemplo-ocorrencia.jpg",
      status: "em_analise",
      prioridade: "alta",
      observacao_gestor: "Chamado encaminhado para a equipe técnica."
  };

  function preencherTela() {
      nomeSidebar.textContent = gestor.nome;

      campos.titulo.value = ocorrencia.titulo;
      campos.descricao.value = ocorrencia.descricao;
      campos.categoria.value = ocorrencia.categoria;
      campos.setorOrigem.value = ocorrencia.setor_origem;
      campos.setorResponsavel.value = ocorrencia.setor_responsavel;
      campos.local.value = ocorrencia.local;
      campos.urgencia.value = ocorrencia.urgencia;
      campos.autor.value = ocorrencia.autor;
      campos.dataEnvio.value = ocorrencia.data_envio;
      campos.status.value = ocorrencia.status;
      campos.prioridade.value = ocorrencia.prioridade;
      campos.observacao.value = ocorrencia.observacao_gestor;

      if (ocorrencia.anexo) {
          campos.anexo.src = ocorrencia.anexo;
          campos.anexo.style.display = "block";
      }
  }

  function validarFormulario() {
      if (!campos.status.value) {
          campos.mensagem.textContent = "Selecione um status.";
          campos.mensagem.style.color = "#d62828";
          return false;
      }

      if (!campos.prioridade.value) {
          campos.mensagem.textContent = "Selecione uma prioridade.";
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
          id: ocorrencia.id,
          status: campos.status.value,
          prioridade: campos.prioridade.value,
          observacao_gestor: campos.observacao.value
      };

      try {
          console.log("Enviando para backend:", payload);

          // Futuro:
          // await fetch(`/ocorrencias/${ocorrencia.id}`, {...})

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
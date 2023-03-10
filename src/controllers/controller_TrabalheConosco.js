const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const {
    primeiroNome,
    sobreNome,
    email,
    vagaEscolhida,
    nivelAtual,
    disponibilidade,
    mensagem,
    anexo,
  } = req.body;

  if (
    !primeiroNome ||
    !sobreNome ||
    !email ||
    !vagaEscolhida ||
    !nivelAtual ||
    !disponibilidade
  ) {
    return res.status(400).json({
      message: "Dados Inválidos",
      error: "Os campos obrigatórios não enviados.",
    });
  }

  try {
    const novoCandidato = await prisma.trabalheConosco.create({
      data: {
        primeiroNome,
        sobreNome,
        email,
        vagaEscolhida,
        nivelAtual,
        disponibilidade,
        mensagem,
        anexo,
      },
    });
    res
      .status(200)
      .json({ message: "Candidato cadastrado com sucesso!", novoCandidato });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchAll = async (req, res) => {
  try {
    const candidatos = await prisma.trabalheConosco.findMany();
    if (candidatos.length < 1) {
      return res.status(404).json({ message: "Dados Não Encontrados" });
    }
    res.status(200).json({ candidatos });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  const id_ = parseInt(id);
  try {
    const candidato = await prisma.trabalheConosco.findMany({
      where: {
        id: id_,
      },
    });

    if (candidato.length < 1) {
      res.status(404).json({ message: "Candidato não encontrado" });
    } else {
      res.status(200).json({ candidato });
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchByNameOrJobs = async (req, res) => {
  const { primeiroNome, vagaEscolhida } = req.query;

  try {
    const candidatos = await prisma.trabalheConosco.findMany({
      where: {
        primeiroNome: {
          contains: primeiroNome || "",
        },
        vagaEscolhida: {
          contains: vagaEscolhida || "",
        },
      },
    });

    if (candidatos.length === 0) {
      return res.status(404).json({ message: "Nenhum candidato encontrado" });
    }

    res.status(200).json({ candidatos });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }
  const id_ = parseInt(id);

  try {
    const recursoExcluido = await prisma.trabalheConosco.delete({
      where: {
        id: id_,
      },
    });

    res.status(200).json({ message: "Recurso removido com sucesso!", recursoExcluido });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.updateOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  const {
    primeiroNome,
    sobreNome,
    email,
    vagaEscolhida,
    nivelAtual,
    disponibilidade,
    mensagem,
    anexo,
  } = req.body;

  if (
    !primeiroNome ||
    !sobreNome ||
    !email ||
    !vagaEscolhida ||
    !nivelAtual ||
    !disponibilidade
  ) {
    return res.status(400).json({
      message: "Dados Inválidos",
      error:
        "Os campos primeiroNome, sobreNome, email, vagaEscolhida, nivelAtual e disponibilidade são obrigatórios.",
    });
  }

  const id_ = parseInt(id);

  try {
    const candidatoAtualizado = await prisma.trabalheConosco.update({
      where: {
        id: id_,
      },
      data: {
        primeiroNome,
        sobreNome,
        email,
        vagaEscolhida,
        nivelAtual,
        disponibilidade,
        mensagem,
        anexo,
      },
    });
    res
      .status(200)
      .json({ message: "Candidato editado com sucesso!", candidatoAtualizado });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.createObs = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Necessário informar o candidato" });
  }
  const candidatoId = parseInt(id);

  const { observacao } = req.body;
  if (!observacao) {
    return res
      .status(400)
      .json({ message: "Necessário preencher a observação." });
  }

  try {
    const candidato = await prisma.trabalheConosco.findFirst({
      where: {
        id: candidatoId,
      },
    });

    if (!candidato) {
      return res.status(404).json({ message: "Candidato não cadastrado" });
    }

    const salvarObs = await prisma.observacoes.create({
      data: {
        observacao,
        candidato_trabalheConosco: {
          connect: {
            id: candidato.id,
          },
        },
      },
    });

    res.status(200).json({ salvarObs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar observação" });
  }
};

exports.searchAllObs = async (req, res) => {
  const { id } = req.params;
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({
      message: "Necessário informar o id do candidato como um número",
    });
  }
  const candidatoId = parseInt(id);

  try {
    const observacoes = await prisma.observacoes.findMany({
      where: {
        id_candidato: candidatoId,
      },
    });

    if (observacoes.length < 1) {
      return res
        .status(404)
        .json({ message: "Não existe observações para o candidato informado" });
    }

    res.status(200).json({ observacoes });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchObsById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Necessário informar o candidato" });
  }
  const candidatoId = parseInt(id);

  const { idObs } = req.params;
  if (!idObs) {
    return res
      .status(400)
      .json({ message: "Necessário informar a observação" });
  }

  const idObservacao = parseInt(idObs);

  try {
    const observacao = await prisma.observacoes.findFirst({
      where: {
        id: idObservacao,
        id_candidato: candidatoId,
      },
    });

    if (!observacao) {
      res.status(404).json({ message: "Observação não encontrada" });
    } else {
      res.status(200).json({ observacao });
    }
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.updateObsOne = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Necessário informar o candidato" });
  }
  const candidatoId = parseInt(id);

  const { idObs } = req.params;
  if (!idObs) {
    return res
      .status(400)
      .json({ message: "Necessário informar a observação" });
  }

  const idObservacao = parseInt(idObs);

  const { observacao } = req.body;
  if (!observacao) {
    return res
      .status(400)
      .json({ message: "Necessário preencher a observação." });
  }

  try {
    const observacaoAntiga = await prisma.observacoes.findFirst({
      where: {
        id: idObservacao,
        id_candidato: candidatoId,
      },
    });

    if (!observacaoAntiga) {
      return res.status(404).json({ message: "Observação não encontrada." });
    }

    const observacaoAtualizada = await prisma.observacoes.update({
      where: {
        id: idObservacao,
        id_candidato: candidatoId,
      },
      data: {
        observacao,
        candidato_trabalheConosco: {
          connect: {
            id: candidatoId,
          },
        },
      },
    });

    res.status(200).json({
      message: "Observação atualizada com sucesso!",
      observacaoAtualizada,
    });
  } catch (err) {
    console.error(err);

    if (err.code === "P2025") {
      return res.status(404).json({ message: "Observação não encontrada." });
    }

    res.status(500).json({ message: "Erro ao atualizar observação." });
  }
};

exports.deleteObsOne = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Necessário informar o candidato" });
  }
  const candidatoId = parseInt(id);

  const { idObs } = req.params;
  if (!idObs) {
    return res
      .status(400)
      .json({ message: "Necessário informar a observação" });
  }

  const idObservacao = parseInt(idObs);

  try {
    const recursoExcluido = await prisma.observacoes.delete({
      where: {
        id: idObservacao,
        id_candidato: candidatoId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Recurso removido com sucesso!",
      recursoExcluido,
    });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

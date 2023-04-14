const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const {
    nome,
    telefone,
    email,
    vagaEscolhida,
    nivelAtual,
    pretensao,
    motivo,
    anexo,
  } = req.body;

  if (
    !nome ||
    !telefone ||
    !email ||
    !vagaEscolhida ||
    !nivelAtual ||
    !pretensao
  ) {
    return res.status(400).json({
      message: "Dados Inválidos",
      error: "Campos nome, telefone, email, vagaEscolhida, nivelAtual, pretensao são obrigatórios.",
    });
  }

  try {
    const novoCandidato = await prisma.trabalheConosco.create({
      data: {
        nome,
        telefone,
        email,
        vagaEscolhida,
        nivelAtual,
        pretensao,
        motivo,
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
  const { nome, vagaEscolhida } = req.query;

  try {
    const candidatos = await prisma.trabalheConosco.findMany({
      where: {
        nome: {
          contains: nome || "",
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
    nome,
    telefone,
    email,
    vagaEscolhida,
    nivelAtual,
    pretensao,
    motivo,
    anexo,
  } = req.body;

  if (
    !nome ||
    !telefone ||
    !email ||
    !vagaEscolhida ||
    !nivelAtual ||
    !pretensao
  ) {
    return res.status(400).json({
      message: "Dados Inválidos",
      error:
        "Os campos nome, telefone, email, vagaEscolhida, nivelAtual e pretensao são obrigatórios.",
    });
  }

  const id_ = parseInt(id);

  try {
    const candidatoAtualizado = await prisma.trabalheConosco.update({
      where: {
        id: id_,
      },
      data: {
        nome,
        telefone,
        email,
        vagaEscolhida,
        nivelAtual,
        pretensao,
        motivo,
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

  const { softskills, score } = req.body;
  if (!softskills || !score) {
    return res
      .status(400)
      .json({ message: "Necessário preencher a softskill e score." });
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

    const salvarObs = await prisma.scores.create({
      data: {
        score,
        softskills,
        TrabalheConosco: {
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
    const scores = await prisma.scores.findMany({
      where: {
        fk_candidatoId: candidatoId,
      },
    });

    if (scores.length < 1) {
      return res
        .status(404)
        .json({ message: "Não existe observações para o candidato informado" });
    }

    res.status(200).json({ scores });
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
      .json({ message: "Necessário informar o score" });
  }

  const idObservacao = parseInt(idObs);

  try {
    const observacao = await prisma.scores.findFirst({
      where: {
        id: idObservacao,
        fk_candidatoId: candidatoId,
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

exports.updateOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  const {
    cargo, departamento, comentario
  } = req.body;

  if (
    !comentario && !cargo && !departamento
  ) {
    return res.status(400).json({
      message: "Dados Inválidos",
      error:
        "Pelo menos um desses campos comentário, departamento e comentário devem ser preenchidos",
    });
  }

  const id_ = parseInt(id);

  try {
    const candidatoAtualizado = await prisma.trabalheConosco.update({
      where: {
        id: id_,
      },
      data: {
        cargo, departamento, comentario
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
    const recursoExcluido = await prisma.scores.delete({
      where: {
        id: idObservacao
      },
    });

    res.status(200).json({
      success: true,
      message: "Recurso removido com sucesso!",
      recursoExcluido,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Não foram encontrados candidados ou observação com os dados informados." });;
  }
};

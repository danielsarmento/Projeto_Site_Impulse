const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.welcome = (req, res) => {
  res.json({ API: "API Site Impulse" });
};

exports.create = async (req, res) => {
  const {
    nome,
    rg,
    cpf,
    dataNascimento,
    dataContratacao,
    email,
    telefoneWapp,
    departamento,
    cargo,
    salario,
    pix,
    modeloContratacao,
    estagio,
    escolaVinculo,
    horasAlocadas,
    dataDemissao,
    turnOver
  } = req.body;

  try {
    const funcionarioCadastrado = await prisma.employee.create({
      data: {
        nome,
        rg,
        cpf,
        dataNascimento,
        dataContratacao,
        email,
        telefoneWapp,
        departamento,
        cargo,
        salario,
        pix,
        modeloContratacao,
        estagio,
        escolaVinculo,
        horasAlocadas,
        dataDemissao,
        turnOver
      }
    });
    res.json({message: "Funcionário cadastrado com sucesso!", funcionarioCadastrado});

  } catch (err) {
    console.error(err);
    res.json({
      error: "Dados inválidos",
      message: "Um ou mais campos estão inválidos",
    });
  }
};

exports.searchAll = async (req, res) => {
  try {
    const todos_funcionarios = await prisma.employee.findMany();
    console.log(todos_funcionarios);
    res.json({
      status: 200,
      message: "Funcionários cadastrados",
      todos_funcionarios,
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não encontrados",
    });
  }
};

exports.search = async (req, res) => {
  const { nomeFuncionario } = req.params;
  try {
    const func = await prisma.employee.findMany({
      where: {
        nome: {
          startsWith: nomeFuncionario,
          mode: "insensitive",
        },
      },
    });
    res.json({ status: 200, func });
  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não encontrados",
    });
  }
};

exports.search_Id = async (req, res) => {
  const { id } = req.params;
  const id_ = parseInt(id);
  console.log(id)

  try {
    const func = await prisma.employee.findMany({
      where: {
        id: id_
      },
    });

    res.json({ status: 200, func });
  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não encontrados",
    });
  }
};

exports.updateOne = async (req, res) => {
  const { id } = req.params;
  const id_ = parseInt(id);
  const {
    nome,
    rg,
    cpf,
    dataNascimento,
    dataContratacao,
    email,
    telefoneWapp,
    departamento,
    cargo,
    salario,
    pix,
    modeloContratacao,
    estagio,
    escolaVinculo,
    horasAlocadas,
    dataDemissao,
    turnOver,
  } = req.body;

  try {
    const func_edit = await prisma.employee.update({
      where: {
        id: id_
      },
      data: {
        nome,
        rg,
        cpf,
        dataNascimento,
        dataContratacao,
        email,
        telefoneWapp,
        departamento,
        cargo,
        salario,
        pix,
        modeloContratacao,
        estagio,
        escolaVinculo,
        horasAlocadas,
        dataDemissao,
        turnOver,
      },
    });

    res.json({ status: 200, func_edit });
  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não editados",
    });
  }
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  const id_ = parseInt(id);

  try {
    const func_edit = await prisma.employee.delete({
      where: {
        id: id_
      },
    });
    res.json({ status: 204, message: "Funcionário removido com sucesso!" });
  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não deletados",
    });
  }
};

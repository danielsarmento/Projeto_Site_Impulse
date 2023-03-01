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
      email,
      telefoneWapp,
      salario,
      codBanco,
      agenciaBanco,
      contaBanco,
      pixBanco,
      dataContratacao,
      modeloContratacao,
      departamento,
      cargo,
      estagio,
      escolaVinculo,
      horasAlocadas,
      dataDemissao,
      status,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep
  } = req.body;
  
  if( !nome ||
      !cpf ||
      !dataNascimento ||
      !email ||
      !telefoneWapp ||
      !dataContratacao ||
      !modeloContratacao ||
      !departamento ||
      !cargo ||
      !horasAlocadas ||
      !status ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !cep){
      return res.status(400).json({message: "Dados Inválidos"})
}

  try {
    const funcionarioCadastrado = await prisma.employee.create({
      data: {
        nome,
        rg,
        cpf,
        dataNascimento,
        email,
        telefoneWapp,
        salario,
        codBanco,
        agenciaBanco,
        contaBanco,
        pixBanco,
        dataContratacao,
        modeloContratacao,
        departamento,
        cargo,
        estagio,
        escolaVinculo,
        horasAlocadas,
        dataDemissao,
        status,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep
      }
    });
    res.status(200).json({message: "Funcionário cadastrado com sucesso!", funcionarioCadastrado});

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchAll = async (req, res) => {
  try {
    const todos_funcionarios = await prisma.employee.findMany();

      res.status(200).json({
        todos_funcionarios
      })
  
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.search = async (req, res) => {
  const { nomeFuncionario } = req.params;

  if(!nomeFuncionario){
    return res.status(404).json({message: "Dados Inválidos"})
  }
  try {
    const func = await prisma.employee.findMany({
      where: {
        nome: {
          startsWith: nomeFuncionario,
          mode: "insensitive",
        },
      },
    });
    
    res.status(200).json({ func });

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.search_Id = async (req, res) => {
  const { id } = req.params;
  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }
  const id_ = parseInt(id);

  try {
    const func = await prisma.employee.findMany({
      where: {
        id: id_
      },
    });

    res.status(200).json({func})
    
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.updateOne = async (req, res) => {
  const { id } = req.params;
  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }

  const id_ = parseInt(id);
  const {
      nome,
      rg,
      cpf,
      dataNascimento,
      email,
      telefoneWapp,
      salario,
      codBanco,
      agenciaBanco,
      contaBanco,
      pixBanco,
      dataContratacao,
      modeloContratacao,
      departamento,
      cargo,
      estagio,
      escolaVinculo,
      horasAlocadas,
      dataDemissao,
      status,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      cep
  } = req.body;

  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }

  if( !nome ||
      !cpf ||
      !dataNascimento ||
      !email ||
      !telefoneWapp ||
      !dataContratacao ||
      !modeloContratacao ||
      !departamento ||
      !cargo ||
      !horasAlocadas ||
      !status ||
      !rua ||
      !numero ||
      !bairro ||
      !cidade ||
      !estado ||
      !cep){
    return res.status(400).json({message: "Dados Inválidos"})
}

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
        email,
        telefoneWapp,
        salario,
        codBanco,
        agenciaBanco,
        contaBanco,
        pixBanco,
        dataContratacao,
        modeloContratacao,
        departamento,
        cargo,
        estagio,
        escolaVinculo,
        horasAlocadas,
        dataDemissao,
        status,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        cep
      },
    });

    res.status(200).json({ message: 'Funcionário editado com sucesso!', func_edit });

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.deleteOne = async (req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }
  const id_ = parseInt(id);

  try {
    const func_edit = await prisma.employee.delete({
      where: {
        id: id_
      }
    });

    res.status(200).json({ message: "Funcionário removido com sucesso!", func_edit });

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
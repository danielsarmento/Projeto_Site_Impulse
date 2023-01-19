const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const {
    nome,
    cnpj,
    cnpjApto,
    razaoSocial,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    emailResponsavel,
    nomeResponsavel,
    telefoneResponsavel,
    Situacao
  } = req.body;

  try{
    const newClient = await prisma.client.create({
    data:{
      nome,
      cnpj,
      cnpjApto,
      razaoSocial,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      emailResponsavel,
      nomeResponsavel,
      telefoneResponsavel,
      Situacao
    }
  })
  console.log(newClient);
  res.json({ status: 200, message: "Cliente cadastrado com sucesso!", newClient});

  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados inválidos",
      message: "Um ou mais campos estão inválidos",
    });
  }
};

exports.searchAll = async (req, res) => {

  try{
    const clients = await prisma.client.findMany();
    res.json({status: 200, clients})
  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não encontrados",
    });
  }
};

exports.search = async (req, res) => {
  const {id} = req.params;
  const id_ = parseInt(id);
  
  try{
    const client = await prisma.client.findMany({
      where: {
        id: id_
      },
    });

    if(client.length == 0){
      res.json({status: 200, message: 'Cliente não encontrado'})
    } else {
      res.json({status: 200, client})
    }
    
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
    const {
      nome,
      cnpj,
      cnpjApto,
      razaoSocial,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      emailResponsavel,
      nomeResponsavel,
      telefoneResponsavel,
      Situacao
    } = req.body;

    const id_ = parseInt(id);

  try{
    const clientUpdate = await prisma.client.update({
      where:{
        id: id_
      },
      data:{
        nome,
        cnpj,
        cnpjApto,
        razaoSocial,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        emailResponsavel,
        nomeResponsavel,
        telefoneResponsavel,
        Situacao
      }
    });
    res.json({ status: 200, message: 'Cliente editado com sucesso!', clientUpdate });
  }catch (err) {
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
    const client_delete = await prisma.client.delete({
      where: {
        id: id_,
      },
    });

    res.json({ status: 204, message: 'Cliente removido com sucesso!' });

  } catch (err) {
    console.error(err);
    res.json({
      status: 400,
      error: "Dados não deletados",
    })}
};
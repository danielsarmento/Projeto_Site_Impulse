const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const {
    nome,
    cnpj,
    razaoSocial,
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    emailResponsavel,
    nomeResponsavel,
    telefoneResponsavel,
    situacao
  } = req.body;

  if( !nome || 
      !cnpj ||
      !razaoSocial || 
      !emailResponsavel ||
      !nomeResponsavel || 
      !situacao){
        return res.status(400).json({message: "Dados Inválidos"})
  }

  try{
    const newClient = await prisma.client.create({
      data:{
        nome,
        cnpj,
        razaoSocial,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        emailResponsavel,
        nomeResponsavel,
        telefoneResponsavel,
        situacao
      }
    })
    res.status(200).json({message: "Cliente cadastrado com sucesso!", newClient});

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchAll = async (req, res) => {

  try{
    const clients = await prisma.client.findMany();
    if(clients.length < 1){
      return res.status(404).json({message: "Dados Não Encontrados"})
    }
    res.status(200).json({clients})
    
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.search = async (req, res) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }

  const id_ = parseInt(id);
  try{
    const client = await prisma.client.findMany({
      where: {
        id: id_
      },
    });

    if(client.length < 1){
      res.status(404).json({ message: 'Cliente não encontrado'})
    } else {
      res.status(200).json({client})
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.updateOne = async (req, res) => {
    const { id } = req.params;
    const {
      nome,
      cnpj,
      razaoSocial,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      emailResponsavel,
      nomeResponsavel,
      telefoneResponsavel,
      situacao
    } = req.body;

    if( !nome || 
        !cnpj ||
        !razaoSocial || 
        !emailResponsavel ||
        !nomeResponsavel || 
        !situacao){
          return res.status(400).json({message: "Dados Inválidos"})
    }
    if(!id){
      return res.status(400).json({message: "Dados Inválidos"})
    }

    const id_ = parseInt(id);

  try{
    const clientUpdate = await prisma.client.update({
      where:{
        id: id_
      },
      data:{
        nome,
        cnpj,
        razaoSocial,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        emailResponsavel,
        nomeResponsavel,
        telefoneResponsavel,
        situacao
      }
    });
    res.status(200).json({message: 'Cliente editado com sucesso!', clientUpdate });
  }catch (err) {
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
    const client_delete = await prisma.client.delete({
      where: {
        id: id_
      },
    });

    res.status(200).json({message: 'Cliente removido com sucesso!', client_delete});

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
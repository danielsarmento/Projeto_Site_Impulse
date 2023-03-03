const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { titulo, url, login, senha, departamento } = req.body;
  if( !titulo || 
      !url ||
      !login || 
      !senha ||
      !departamento){
      return res.status(400).json({message: "Dados Inválidos"})
  }

  try {
    const acesso = await prisma.acess.create({
      data:{
        titulo, 
        url, 
        login, 
        senha, 
        departamento
      }
    });
    
    res.status(200).json({acesso})

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchId = async (req, res) => {
  const {id} = req.params;
  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }

  const id_ = parseInt(id);
  try{
    const acesso = await prisma.acess.findMany({
      where: {
        id: id_
      },
    });

    res.status(200).json({acesso})
    
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchAll = async (req, res) => {
  try{
    const acesso = await prisma.acess.findMany();

    res.status(200).json({acesso})
    
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.updateOne = async (req, res) => {
  const { id } = req.params;
  const {
    titulo, url, login, senha, departamento
  } = req.body;

  if( !titulo || 
      !url ||
      !login || 
      !senha ||
      !departamento){
        return res.status(400).json({message: "Dados Inválidos"})
  }

  if(!id){
    return res.status(400).json({message: "Dados Inválidos"})
  }

  const id_ = parseInt(id);

  try{
    const acessoUpdate = await prisma.acess.update({
      where:{
        id: id_
      },
      data:{
        titulo, 
        url, 
        login, 
        senha, 
        departamento
      }
    });

    res.status(200).json({message: 'Acesso editado com sucesso!', acessoUpdate });

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
    const acessoDelete = await prisma.acess.delete({
      where: {
        id: id_
      },
    });

    res.status(200).json({message: 'Acesso removido com sucesso!', acessoDelete});

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};
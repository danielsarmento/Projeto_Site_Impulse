const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { titulo, url, login, senha, departamentoId } = req.body;
  if (!titulo || !url || !login || !senha || !departamentoId) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  try {
    const acesso = await prisma.acess.create({
      data: {
        titulo,
        url,
        login,
        senha,
        fk_departamentoId: departamentoId,
      },
    });

    res.status(200).json({ acesso });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

exports.searchId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  const id_ = parseInt(id);
  try {
    const acesso = await prisma.acess.findMany({
      where: {
        id: id_,
      },
    });

    res.status(200).json({ acesso });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};


exports.searchAll = async (req, res) => {
  try {
    const id = req.sub;
    const id_ = Number(id);

    const role = await prisma.usersRoles.findFirst({
      where:{
        fk_UserId: id_
      }
    })

    if(role.fk_RoleId == 1 || role.fk_RoleId == 3){
      const acessos = await prisma.acess.findMany();
      return res.status(200).json({acessos});
    } else {
      const users = await prisma.user.findFirst({
        where: {
          id: id_,
        },
      });
      const funcionario = await prisma.employee.findFirst({
        where: {
          email: users.email,
        },
      });
  
      
      //Incluído regra para retornar array vazio para carregar página quando não tiver dados cadastrados em funcionários.
      if (!funcionario) {
        return res.status(200).json({ acessos: [] });
      }    
      
      const acessos = await prisma.acess.findMany({
        where: {
          fk_departamentoId: funcionario.fk_departamentoId,
        },
      });
      
      //Incluído regra para retornar array vazio para carregar página quando não tiver dados cadastrados em acessos.
      return res.status(200).json({acessos}); 
    }

    

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};


exports.updateOne = async (req, res) => {
  const { id } = req.params;
  const { titulo, url, login, senha, departamentoId } = req.body;

  if (!titulo || !url || !login || !senha || !departamentoId) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  if (!id) {
    return res.status(400).json({ message: "Dados Inválidos" });
  }

  const id_ = parseInt(id);

  try {
    const acessoUpdate = await prisma.acess.update({
      where: {
        id: id_,
      },
      data: {
        titulo,
        url,
        login,
        senha,
        fk_departamentoId: departamentoId,
      },
    });

    res
      .status(200)
      .json({ message: "Acesso editado com sucesso!", acessoUpdate });
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
    const acessoDelete = await prisma.acess.delete({
      where: {
        id: id_,
      },
    });

    res
      .status(200)
      .json({ message: "Acesso removido com sucesso!", acessoDelete });
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

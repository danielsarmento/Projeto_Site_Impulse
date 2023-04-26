const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createNotification = async (req, res) => {
  const { conteudo, usuarios } = req.body;
  const id = req.sub;
  const dados = []

  if(!conteudo){
    res.status(400).end();
  }

  try {
    const notificacao = await prisma.notificacao.create({
      data: {
        conteudo,
        Usuario:{
          connect:{
            id: Number(id)
          }
        }
      }
    })
    const idNotificacao = Number(notificacao.id)

    usuarios.map((id) => {
      dados.push({fk_UserId: Number(id), fk_NotfId: idNotificacao, check: false})
    })

    const controleNotificacao = await prisma.controleNotificacoes.createMany({
      data: dados
    })

    res.status(200).json({notificacao, controleNotificacao})
    
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.searchNotification = async (req, res) => {
  const id = req.sub;
  
  try {
    const notificacoesDisponiveis = await prisma.controleNotificacoes.findMany({
      where:{
        fk_UserId: Number(id),
        check: false
      },
      include:{
        Notificacao: true
      }
    })

    res.status(200).json(notificacoesDisponiveis)

  } catch(err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.checkNotification = async (req, res) => {
  const {id} = req.body
  const idNotificacoes = []
  
  try {
    const notificacaoVisualizada = await prisma.controleNotificacoes.updateMany({
      where:{
        fk_UserId: Number(id)
      },
      data: {
        check: true
      }
    })

    res.status(200).json(notificacaoVisualizada)

  } catch(err) {
    console.log(err);
    res.status(500).end();
  }
}
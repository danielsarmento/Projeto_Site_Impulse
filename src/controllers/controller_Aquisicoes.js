const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const {
        nomeCliente, 
        nomeProduto, 
        dataAdquirido, 
        dataRetirada, 
        situacao,
        valorMensal} = req.body;
        
        try{
            const aquisicaoCadastrada = await prisma.acquisition.create({
                data: {
                    nomeCliente, 
                    nomeProduto, 
                    dataAdquirido, 
                    dataRetirada, 
                    situacao,
                    valorMensal
                }
            });
            res.status(200).json({
                aquisicaoCadastrada
            })
        } catch(err){
            console.log(err)
            res.status(400).json({Message:"Recurso Não Cadastrado" })
        }
};

exports.searchId = async (req, res) => {
    const {id} = req.params;
    const id_ = parseInt(id);
     try{
        const aquisicao = await prisma.acquisition.findMany({
            where: {
                id: id_
            }
        })
        res.status(200).json({
            aquisicao
        })
     }catch(err){
        console.log(err)
        res.status(400).json({Message:"Recurso Não Encontrado" })
    } 
};

exports.searchAll = async (req, res) => {
     try{
        const aquisicao = await prisma.acquisition.findMany();
        res.status(200).json({
            aquisicao
        })
     }catch(err){
        console.log(err)
        res.status(400).json({Message:"Recurso Não Encontrado" })
    } 
};

exports.updateOne = async (req, res) => {
    const {id} = req.params;
    const {
        nomeCliente, 
        nomeProduto, 
        dataAdquirido, 
        dataRetirada, 
        situacao,
        valorMensal} = req.body;
    const id_ = parseInt(id);
    try{
        const aquisicao = await prisma.acquisition.update({
            where:{
                id:id_
            },
            data: {
                nomeCliente, 
                nomeProduto, 
                dataAdquirido, 
                dataRetirada, 
                situacao,
                valorMensal
            }
        });
    res.status(200).json({aquisicao});

    }catch (err) {
        console.log(err)
        res.json({
            status: 400,
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos",
          });
    }
};

exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    const id_ = parseInt(id);
    try{
        const produtoDeletado = await prisma.acquisition.delete({
            where: {
                id: id_
            },
        })
        res.json({status: 204, Message: "Recurso Deletado"})
    } catch (err) {
        console.log(err)
        res.json({status: 404, error: "Recurso Não Encontrado", Message: "Recurso Não Encontrado"})
    }
}
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const {segmento, descricao} = req.body;
    try{
        const produto = await prisma.product.create({
            data: {
                segmento, descricao
            }
        });
        console.log(produto);
    res.status(200).json({message: "Produto cadastrado com sucesso!" });

    }catch (err) {
        console.log(err)
        res.json({
            status: 400,
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos",
          });
    }
};

exports.searchAll = async (req, res) => {
    try{
        const produtos = await prisma.product.findMany();
        console.log(produtos);
    res.status(200).json({message: "Produtos cadastrados", produtos });

    }catch (err) {
        console.log(err)
        res.json({
            status: 400,
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos",
          });
    }
};

exports.searchId = async (req, res) => {
    const {id} = req.params;
    const id_ = parseInt(id);
    try{
        const produtos = await prisma.product.findMany({
            where:{
                id:id_
            }
        });
        console.log(produtos);
    res.status(200).json({message: "Produto cadastrado", produtos });

    }catch (err) {
        console.log(err)
        res.json({
            status: 400,
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos",
          });
    }
};

exports.updateOne = async (req, res) => {
    const {id} = req.params;
    const {segmento, descricao} = req.body;
    const id_ = parseInt(id);
    try{
        const produtos = await prisma.product.update({
            where:{
                id:id_
            },
            data: {
                segmento, 
                descricao
            }
        });
        console.log(produtos);
    res.status(200).json({message: "Produto editado com sucesso", produtos });

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
    console.log(id)
    try{
        const produtoDeletado = await prisma.product.delete({
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
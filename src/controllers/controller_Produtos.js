const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const {nome, segmento, descricao} = req.body;
    if( !nome || 
        !segmento ||
        !descricao){
          return res.status(400).json({message: "Dados Inválidos"})
    }

    try{
        const produto = await prisma.product.create({
            data: {
                nome, segmento, descricao
            }
        });

        res.status(200).json({message: "Produto cadastrado com sucesso!", produto});

    }catch (err) {
        console.log(err)
        res.status(500).end();
    }
};

exports.searchAll = async (req, res) => {
    try{
        const produtos = await prisma.product.findMany();
        if(produtos.length < 1){
            return res.status(404).json({message: "Dados Não Encontrados"})
        }
        res.status(200).json({produtos});

    }catch (err) {
        console.log(err)
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
        const produtos = await prisma.product.findMany({
            where:{
                id:id_
            }
        });
        res.status(200).json({message: "Produto cadastrado", produtos });

    }catch (err) {
        console.log(err)
        res.status(500).end();
    }
};

exports.updateOne = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message: "Dados Inválidos"})
    }

    const {nome, segmento, descricao} = req.body;
    if( !nome || 
        !segmento ||
        !descricao){
          return res.status(400).json({message: "Dados Inválidos"})
    }

    const id_ = parseInt(id);
    try{
        const produtos = await prisma.product.update({
            where:{
                id:id_
            },
            data: {
                nome,
                segmento, 
                descricao
            }
        });
        res.status(200).json({message: "Produto editado com sucesso", produtos });

    }catch (err) {
        console.log(err)
        res.status(500).end();
    }
};

exports.deleteOne = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message: "Dados Inválidos"})
    }

    const id_ = parseInt(id);
    try{
        const produtoDeletado = await prisma.product.delete({
            where: {
                id: id_
            },
        })
        res.status(200).json({Message: "Recurso Deletado", produtoDeletado})

    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
};
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const {nome, descricao} = req.body;
    if(!nome){
        res.status(400).json({mensagem: "Dados incompletos"})
    }

    try{
        const cargo = await prisma.cargo.create({
            data: {
                nome,
                descricao
            }
            
        })

        res.status(200).json(cargo)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.searchAll = async (req, res) => {
    try{
        const cargos = await prisma.cargo.findMany()
        
        res.status(200).json(cargos)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.searchById = async (req, res) => {
    const {id} = req.params
    if(!id){
        res.status(400).json({mensagem: "Dados incompletos"})
    }
    try{
        const cargo = await prisma.cargo.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(cargo)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.update = async (req, res) => {
    const {id, nome, descricao} = req.body;
    if(!id || !nome){
        res.status(400).json({mensagem: "Dados incompletos"})
    }
    try{
        const cargo = await prisma.cargo.update({
            where: {
                id: Number(id)
            },
            data:{
                nome,
                descricao
            }
        })

        res.status(200).json(cargo)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.delete = async (req, res) => {
    const {id} = req.body;
    try{
        const cargo = await prisma.cargo.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(cargo)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
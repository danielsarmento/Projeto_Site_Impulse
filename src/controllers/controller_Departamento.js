const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const {nome, descricao} = req.body;
    if(!nome){
        res.status(400).json({mensagem: "Dados incompletos"})
    }

    try{
        const departamento = await prisma.departamento.create({
            nome,
            descricao
        })

        res.status(200).json(departamento)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.searchAll = async (req, res) => {
    try{
        const departamentos = await prisma.departamento.findMany()

        res.status(200).json(departamentos)

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
        const departamento = await prisma.departamento.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(departamento)

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
        const departamento = await prisma.departamento.update({
            where: {
                id: Number(id)
            },
            data:{
                nome,
                descricao
            }
        })

        res.status(200).json(departamento)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.delete = async (req, res) => {
    const {id} = req.body;
    try{
        const departamento = await prisma.departamento.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(departamento)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
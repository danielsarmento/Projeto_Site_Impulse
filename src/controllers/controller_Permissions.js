const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createPermission = async (req, res) =>{
    const {nome, descricao} = req.body;

    try{
        const existPermission = await prisma.permissions.findMany({
            where: {
                nome
            }
        });

        if(existPermission.length > 0){
            return res.status(200).json({message:"Permission already exists"})
        }

        const newPermission = await prisma.permissions.create({
            data:{
                nome, descricao
            }
        })

        res.json(newPermission);

    } catch(err) {
        console.error(err);
        res.status(500).end()
    }    
}
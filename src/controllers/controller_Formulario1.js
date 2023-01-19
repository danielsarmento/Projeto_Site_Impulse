const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const { email, question1, question2, question3, question4, question5, question6, question7, question8, question9} = req.body;
    if(!email){
        return res.status(400).json({message: "Dados Inválidos"})
    }

    try{
        const funcionario = await prisma.employee.findMany({
            where: {
                email: email
            }
        });

        if(funcionario.length < 1){
            return res.status(404).json({message: 'Email não cadastrado'})
        }
        let fk_employeedId = funcionario.id;

        const form1 = await prisma.form1.create({
            data: {
                email, 
                question1, 
                question2, 
                question3, 
                question4, 
                question5, 
                question6, 
                question7, 
                question8, 
                question9, 
                Employee: {
                    connect:{
                            id: fk_employeedId
                    }
                }
            }
        });
        res.status(200).json({form1})

    }catch (err){
        console.error(err)
        res.status(500).end()
    }
}

exports.searchOne = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: "Dados Inválidos"})
    }

    try{
        const form1 = await prisma.form1.findMany({
            where: {
                email
            }
        });
        if(form1.length < 1){
            res.status(404).json({message: 'Não há formulário cadastrado para este email!'})
        }
        res.status(200).json({form1})

    } catch (err){
        console.error(err)
        res.status(500).end()
    }
}
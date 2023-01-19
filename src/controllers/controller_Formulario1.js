const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const { email, question1, question2, question3, question4, question5, question6, question7, question8, question9} = req.body;
    try{
        const funcionario = await prisma.employee.findFirst({
            where: {
                email: email
            }
        });

        if(!funcionario){
            return res.status(404).json({message: 'Email não cadastrado', sucess: false})
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
        res.status(200).json({sucess: true, form1})
    }catch (err){
        console.error('Erro', err)
        res.status(500).end()
    }
}

exports.searchOne = async (req, res) => {
    const { email } = req.body;
    try{
        const form1 = await prisma.form1.findMany({
            where: {
                email
            }
        });
        if(!form1){
            res.status(404).json({message: 'Não há formulário cadastrado para este email!'})
        }
        res.status(200).json({form1})
    } catch (err){
        console.error('Erro', err)
        res.status(500).end()
    }
}
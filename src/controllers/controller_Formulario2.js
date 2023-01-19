const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const { email, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11} = req.body;
    try{
        const funcionario = await prisma.employee.findFirst({
            where: {
                email: email
            }
        });
        console.log(email, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11)
        console.log(funcionario)
        if(!funcionario){
            return res.json({message: 'Email não cadastrado', sucess: false})
        }
        let fk_employeedId = funcionario.id;
        const form2 = await prisma.form2.create({
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
                question10,
                question11, 
                Employee: {
                    connect:{
                            id: fk_employeedId
                    }
                }
            }
        });
        res.json({sucess: true, form2})
    }catch (err){
        console.error('Erro', err)
        res.status(500).end()
    }
}

exports.search = async (req, res) => {
    const { email } = req.body;
    try{
        const form2 = await prisma.form2.findMany({
            where: {
                email: email
            }
        });
        if(!form2){
            res.json({message: 'Não há formulário cadastrado para este email!'})
        }
        res.json({form2})
    } catch (err){
        console.error('Erro', err)
        res.status(500).end()
    }
}
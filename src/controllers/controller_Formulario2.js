const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.create = async (req, res) => {
    const { email, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11} = req.body;
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
        res.json({form2})

    }catch (err){
        console.error(err)
        res.status(500).end()
    }
}

exports.search = async (req, res) => {
    const { email } = req.body;
    if(!email){
        return res.status(400).json({message: "Dados Inválidos"})
    }

    try{
        const form2 = await prisma.form2.findMany({
            where: {
                email: email
            }
        });

        if(form2.length < 1){
            return res.status(404).json({message: 'Não há formulário cadastrado para este email!'})
        } else {

            return res.status(200).json({form2})
        }


    } catch (err){
        console.error(err)
        res.status(500).end()
    }
}
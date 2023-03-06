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
        let fk_employeedId = funcionario[0].id;
        
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
        
        return res.status(200).json({form1})

    } catch (err){
        console.error(err)
        res.status(500).end()
    }
}

exports.relatorio = async (req, res) => {
    const { dataInicio, dataFim } = req.query;
    const funcionarioId = req.query.funcionarioId ? parseInt(req.query.funcionarioId) : undefined;
    const question = req.query.question ? parseInt(req.query.question) : undefined;

  
    try {
        const whereClause = {
            AND: [
                { created_at: { gte: dataInicio } },
                { created_at: { lt: dataFim } }
            ]
        };

        if (funcionarioId) {
            whereClause.AND.push({ fk_employeeId: funcionarioId });
        }
        console.log(whereClause)
        
        const respostasFormulario1 = await prisma.formulario1.findMany({
            where: whereClause
        });

        console.log(respostasFormulario1)

        const questionNumbers = question ? [question] : [1, 2, 3, 4, 5, 6, 7, 8];

            const result = questionNumbers.reduce((acc, questionNumber) => {

                const questionKey = `question${questionNumber}`;

                const questionScores = respostasFormulario1.map(
                    respostaFormulario => parseInt(respostaFormulario[questionKey])
                );

                const maxScore = Math.max(...questionScores);
                const minScore = Math.min(...questionScores);
                
                const totalScore = questionScores.reduce((sum, score) => sum + score, 0);
                    const averageScore = totalScore / questionScores.length;
                    const scoreCounts = questionScores.reduce((counts, score) => {
                        counts[score] = (counts[score] || 0) + 1;
                    return counts;
                    }, {}
                );

                acc[questionKey] = {
                    maxScore,
                    minScore,
                    totalScore,
                    averageScore,
                    scoreCounts
                };

            return acc;
            
        }, {});

        return res.json(result)

    } catch (error) {
        console.error(error);
    }
}
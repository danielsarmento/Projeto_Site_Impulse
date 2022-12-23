const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createHash } = require('crypto');

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex');
}

exports.createUser = async (req, res) => {
    const {nome, email, senha} = req.body;
    const senhaCrypto = criaHash(senha);
    
    try{
        if(!nome || !email || !senha){
            res.status(200).json({message: "Um ou mais campos estão inválidos!",create: false})
        }
        const novoUsuario = await prisma.user.create({
            data: {
                nome, email, senha: senhaCrypto
            }
        })
        console.log(`Nome: ${nome}\n e-mail: ${email}\n senha: ${senhaCrypto}`)
        res.status(200).json({message: "Usuário Cadastrado Com Sucesso!",create: true/*, novoUsuario*/})

    } catch (err) {
        console.error(err);
        res.json({
          error: "Dados inválidos",
          message: "Um ou mais campos estão inválidos",
        });
    }
}
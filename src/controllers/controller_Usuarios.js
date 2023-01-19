const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createHash } = require('crypto');

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex');
}

exports.createUser = async (req, res) => {
    const {nome, email, senha} = req.body;
    if( !nome || 
        !email ||
        !senha){
          return res.status(400).json({message: "Dados Inválidos"})
    }

    const senhaCrypto = criaHash(senha);
    
    try{
        const novoUsuario = await prisma.user.create({
            data: {
                nome, email, senha: senhaCrypto
            }
        })
        
        res.status(200).json({message: "Usuário Cadastrado Com Sucesso!", novoUsuario})

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
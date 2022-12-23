const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createHash } = require('crypto');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex');
}

exports.autenticaUsuario = async (req, res) => {
    const {email, senha} = req.body;
    const senhaCrypto = criaHash(senha)

    if(!email || !senha){
        return res.status(400).json({
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos"
        })
    }
    try{

        const users = await prisma.user.findMany({
            where: {
                email: email
            }
        })

        if(email === users[0].email && senhaCrypto === users[0].senha){
            // Gerar Token
            const token = sign(
                {
                    nome: users[0].nome,
                    email: users[0].email
                },
                "d41a88eb1803552942d81184810cf9148475079ab0e02126f0028212777fa648",
                {
                    subject: `${users[0].id}`,
                    expiresIn: '10h'
                }
            )
            return res.status(200).json({
                id: users[0].id,
                nome: users[0].nome,
                email: users[0].email,
                token: token
            })
        } else {
            return res.status(401).json({
                message: "Email ou senha estão inválidos",
              }); 
        }


    } catch (err) {
        console.error(err);
        res.json({
          error: "Dados inválidos",
          message: "Um ou mais campos estão inválidos",
        });
    }

    
}
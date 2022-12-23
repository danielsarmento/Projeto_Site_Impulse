const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createHash } = require('crypto');
const { sign } = require('jsonwebtoken');

function criaHash(senha){
    return createHash('sha256').update(senha).digest('hex');
}

exports.autenticaUsuario = async (req, res) => {
    const {email, senha} = req.body;
    const senhaCrypto = criaHash(senha)

    if(!email || !senha){
        return res.json({
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos"
        })
    }
    try{

        const users = await prisma.user.findFirst({
            where: {
                email
            }
        })
        console.log(users)

        if(email === users.email && senhaCrypto === users.senha){
            // Gerar Token
            const token = sign(
                {
                    nome: users.nome,
                    email: users.email
                },
                process.env.JWT_SECRET,
                {
                    subject: `${users.id}`,
                    expiresIn: '1h'
                }
            )
            return res.status(200).json({
                id: users.id,
                nome: users.nome,
                email: users.email,
                token: token
            })
        } else {
            return res.json({
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
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
        return res.status(400).json({
            error: "Dados inválidos",
            message: "Um ou mais campos estão inválidos"
        })
    }
    try{

        const users = await prisma.user.findMany({
            where: {
                email: email
            },
            include: {
                UsersRoles: true
            }
        })
        console.log(users[0].UsersRoles[0].fk_RoleId)

        if(email === users[0].email && senhaCrypto === users[0].senha){
            // Gerar Token
            const token = sign(
                {
                    nome: users[0].nome,
                    email: users[0].email
                },
                process.env.JWT_SECRET,
                {
                    subject: `${users[0].id}`,
                    expiresIn: '10h'
                }
                
            )
            return res.status(200).json({
                id: users[0].id,
                nome: users[0].nome,
                email: users[0].email,
                roleId: users[0].UsersRoles[0].fk_RoleId,
                token: token
            })
        } else {
            return res.status(401).json({
                message: "Email ou senha estão inválidos",
              }); 
        }


    } catch (err) {
        console.error(err);
        res.status(500).end();
    }

    
}
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
    let role;

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
        console.log(users)

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
            const roleMap = {
                1: "Admin",
                2: "FuncInicial",
                3: "Gerente",
                4: "FuncDev",
                5: "FuncRH",
                6: "FuncComercial",
                7: "FuncFinanceiro"
              };
              
            role = roleMap[users[0].UsersRoles.fk_RoleId];

            return res.status(200).json({
                id: users[0].id,
                nome: users[0].nome,
                email: users[0].email,
                role: role,
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
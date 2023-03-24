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
                nome, 
                email, 
                senha: senhaCrypto,
                UsersRoles: {
                    create: {
                        role:{
                            connect:{
                                id: 2
                            }
                        }
                    }
                }
            }
        })
        
        res.status(200).json({message: "Usuário Cadastrado Com Sucesso!", novoUsuario})

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}

exports.searchUsers = async (req, res) => {
    const usuariosTratados = []
    let funcao;
    try{
        const usuarios = await prisma.user.findMany({
            include: {
                UsersRoles:true
            }
        })
        usuarios.map((obj) => {
            if(obj.UsersRoles[0].fk_RoleId == 1){
                funcao = "Admin"
            } if(obj.UsersRoles[0].fk_RoleId == 2){
                funcao = "FuncInicial"
            } if(obj.UsersRoles[0].fk_RoleId == 3){
                funcao = "Gerente"
            } if(obj.UsersRoles[0].fk_RoleId == 4){
                funcao = "FuncDev"
            } if(obj.UsersRoles[0].fk_RoleId == 5){
                funcao = "FuncRH"
            } if(obj.UsersRoles[0].fk_RoleId == 6){
                funcao = "FuncComercial"
            } if(obj.UsersRoles[0].fk_RoleId == 7){
                funcao = "FuncFinanceiro"
            }
            return usuariosTratados.push({
                id: obj.id,
                nome: obj.nome,
                email: obj.email,
                funcao: funcao
            })
        })
        res.status(200).json(usuariosTratados)
    } catch (err){
        console.error(err);
        res.status(500).end();
    }
}
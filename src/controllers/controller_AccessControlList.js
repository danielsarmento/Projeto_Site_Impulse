const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.editRoles = async (req, res) => {
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


exports.execute = async (req, res) => {
    const {userId, idPermissions} = req.body;
    
    try {
        // Busca as permissoes atreladas a este usuário
        const usuario = await prisma.usersPermissions.findMany({
            where:{
                fk_UserId: userId
            }
        })

        if(!usuario){
            return res.status(400).json({message: "User does not exist!"})
        }
        
        // Excluir os registros viculados ao usuário
        usuario.map(async (registro) => {
            await prisma.usersPermissions.deleteMany({
                where:{
                    id: {
                        in: registro.id
                    }
                }
            })  
        })

        function criaRegistro(fk_User, fk_Perm){
            return {
                fk_UserId: fk_User,
                fk_PermissionId: fk_Perm
            }
        }
        const data = []
        idPermissions.map(idPermission => {
            data.push(criaRegistro(userId,idPermission))
        })

        // cria as novas permissoes
        
        const relacoes = await prisma.usersPermissions.createMany({
            data: data
        })
        
        res.status(200).json(data)

    } catch (err) {
        console.error(err);
        res.status(500).end();
    }
}
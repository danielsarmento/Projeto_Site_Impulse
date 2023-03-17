const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createHash } = require('crypto');

async function main() {
    const dadosAdmin = [
        {fk_RoleId: 2, fk_PermissionId: 1},
        {fk_RoleId: 2, fk_PermissionId: 2},
        {fk_RoleId: 2, fk_PermissionId: 3},
        {fk_RoleId: 2, fk_PermissionId: 4},
        {fk_RoleId: 2, fk_PermissionId: 5},
        {fk_RoleId: 2, fk_PermissionId: 6},
        {fk_RoleId: 2, fk_PermissionId: 7},
        {fk_RoleId: 2, fk_PermissionId: 8},
        {fk_RoleId: 2, fk_PermissionId: 9},
        {fk_RoleId: 2, fk_PermissionId: 10},
        {fk_RoleId: 2, fk_PermissionId: 11},
        {fk_RoleId: 2, fk_PermissionId: 12},
        {fk_RoleId: 2, fk_PermissionId: 13},
        {fk_RoleId: 2, fk_PermissionId: 14},
        {fk_RoleId: 2, fk_PermissionId: 15},
        {fk_RoleId: 2, fk_PermissionId: 16},
        {fk_RoleId: 2, fk_PermissionId: 17},
        {fk_RoleId: 2, fk_PermissionId: 18},
        {fk_RoleId: 2, fk_PermissionId: 19},
        {fk_RoleId: 2, fk_PermissionId: 20},
        {fk_RoleId: 2, fk_PermissionId: 21},
        {fk_RoleId: 2, fk_PermissionId: 22},
        {fk_RoleId: 2, fk_PermissionId: 23},
        {fk_RoleId: 2, fk_PermissionId: 24},
        {fk_RoleId: 2, fk_PermissionId: 25},
        {fk_RoleId: 2, fk_PermissionId: 26},
        {fk_RoleId: 2, fk_PermissionId: 27},
        {fk_RoleId: 2, fk_PermissionId: 28},
        {fk_RoleId: 2, fk_PermissionId: 29},
        {fk_RoleId: 2, fk_PermissionId: 30},
        {fk_RoleId: 2, fk_PermissionId: 31},
        {fk_RoleId: 2, fk_PermissionId: 32},
        {fk_RoleId: 2, fk_PermissionId: 33},
        {fk_RoleId: 2, fk_PermissionId: 34},
        {fk_RoleId: 2, fk_PermissionId: 35},
        //{fk_RoleId: 2, fk_PermissionId: 36},
        {fk_RoleId: 2, fk_PermissionId: 37},
        {fk_RoleId: 2, fk_PermissionId: 38},
        {fk_RoleId: 2, fk_PermissionId: 39},
        {fk_RoleId: 2, fk_PermissionId: 40},
        {fk_RoleId: 2, fk_PermissionId: 41},
        {fk_RoleId: 2, fk_PermissionId: 42},
        {fk_RoleId: 2, fk_PermissionId: 43},
        {fk_RoleId: 2, fk_PermissionId: 44},
        {fk_RoleId: 2, fk_PermissionId: 45},
        {fk_RoleId: 2, fk_PermissionId: 46}
    ]
    const roles = await prisma.rolesPermissions.createMany({
        data: dadosAdmin
    })
    console.log("Criado")
  /*   console.time('speed');

  const func = await prisma.employee.create({
    data: {
      nome: "Brenda",
      rg: "32379004",
      cpf: "097640374964",
      dataNascimento: "1994-04-14T00:00:00.000Z",
      email: "teste5@teste.com.br",
      telefoneWapp: "5583999415087",
      salario: "x",
      codBanco: "x",
      agenciaBanco: "x",
      contaBanco: "x",
      pixBanco: "x",
      dataContratacao: "1994-04-14T00:00:00.000Z",
      modeloContratacao: "x",
      departamento: "x",
      cargo: "x",
      estagio: "x",
      escolaVinculo: "x",
      horasAlocadas: 40,
      dataDemissao: "1994-04-14T00:00:00.000Z",
      turnOver: "x",
      centroDeCusto: "x",
      sindicato: "x",
      status: "x",
      rua: "Alderico Pessoa de Oliveira",
      numero: "347",
      bairro: "Catolé",
      cidade: "Campina Grande",
      estado: "PB",
      cep: "58410430",
    },
  }); */
  
  /* const newClient = await prisma.client.create({
      data: {
          nome: "Cliente Teste1",
          cnpj: "1000000000005",
          cnpjApto: "Sim",
          razaoSocial: "Essa é minha empresa teste",
          endereco: "Elpídio de Almeida",
          numero: "10",
          complemento: "Sala 301",
          bairro: "Catolé",
          cidade: "Campina Grande",
          emailResponsavel: "teste@teste.com.br",
          nomeResponsavel: "Responsavel Teste",
          telefoneResponsavel: "83999999999",
          Situacao: "Ativo",
        },
    });
    const produto = await prisma.product.create({
        data: {
            segmento: "Teste",
            descricao: "Teste",
        },
    });
    const aquisicaoCadastrada = await prisma.acquisition.create({
        data: {
            nomeCliente: "Tetste",
            nomeProduto: "Tetste",
            dataAdquirido: "1994-04-14T00:00:00.000Z",
            dataRetirada: "1994-04-14T00:00:00.000Z",
            situacao: "Tetste",
            valorMensal: "Tetste",
        },
    });
    function criaHash(senha){
        return createHash('sha256').update(senha).digest('hex');
    }
    const senhaCrypto = criaHash('Impulse@2023');
    const novoUsuario = await prisma.user.create({
        data: {
            nome: "teste", 
            email: "teste@teste.com.br", 
            senha: senhaCrypto
        }
    })
    
    const form1 = await prisma.form1.create({
        data: {
            email:"teste@teste.com.br", 
            question1:"teste", 
            question2:"teste", 
            question3:"teste", 
            question4:"teste", 
            question5:"teste", 
            question6:"teste", 
            question7:"teste", 
            question8:"teste", 
            question9:"teste", 
            Employee: {
                connect:{
                    id: 12
                }
            }
        }
    });
    const form2 = await prisma.form2.create({
        data: {
            email:"teste@teste.com.br", 
            question1:"teste", 
            question2:"teste", 
            question3:"teste", 
            question4:"teste", 
            question5:"teste", 
            question6:"teste", 
            question7:"teste", 
            question8:"teste", 
            question9:"teste",
            question10:"teste",
            question11:"teste",   
            Employee: {
                connect:{
                    id: 12
                }
            }
        }
    }); */
    console.timeEnd('speed')
        
    }
//async function search() {
//const func = await prisma.employee.findMany();
//console.log(func);
//}

main();


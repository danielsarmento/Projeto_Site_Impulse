const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createHash } = require('crypto');

async function main() {
    console.time('speed');
    /*
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
  });
  
  const newClient = await prisma.client.create({
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
    */
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
    });
    console.timeEnd('speed')
    
    console.log(
        //func,
        //newClient,
        //produto,
        //aquisicaoCadastrada,
        //novoUsuario
        form1,
        form2
        );
        
    }
    
    async function search() {
  const func = await prisma.employee.findMany();
  console.log(func);
}

main();

const express = require("express");
const routes = express.Router();

const controller_funcionarios = require("../controllers/controller_Funcionarios");
const controller_clientes = require("../controllers/controller_Clientes");
const controller_produtos = require("../controllers/controller_Produtos");
const controller_aquisicoes = require("../controllers/controller_Aquisicoes");
const controller_usuarios = require("../controllers/controller_Usuarios");
const controller_login = require("../controllers/controller_Login");
const controller_form1 = require("../controllers/controller_Formulario1");
const controller_form2 = require("../controllers/controller_Formulario2");
const controller_acessos = require("../controllers/controller_Acessos");
const controller_roles = require('../controllers/controller_Roles');
const controller_permissions = require('../controllers/controller_Permissions');
const controller_acl = require('../controllers/controller_AccessControlList')

const middleware_autenticacao = require("../middlewares/middleware_autenticacao");

routes.get("/", controller_funcionarios.welcome);
routes.post("/createRole", controller_roles.createRole);
routes.post("/createPermission", controller_permissions.createPermission);
routes.post("/editPermissions", controller_acl.execute);

// Rotas de Funcionários
routes.post("/funcionarios", controller_funcionarios.create);
routes.get("/funcionarios", controller_funcionarios.searchAll);
routes.get("/funcionarios/:nomeFuncionario", controller_funcionarios.search);
routes.get("/funcionarios/buscar/:id", controller_funcionarios.search_Id);
routes.put("/funcionarios/:id", controller_funcionarios.updateOne);
routes.delete("/funcionarios/:id", controller_funcionarios.deleteOne);

//Rotas de Clientes
routes.post("/clientes", controller_clientes.create);
routes.get("/clientes", controller_clientes.searchAll);
routes.get("/clientes/:id", controller_clientes.search);
routes.put("/clientes/:id", controller_clientes.updateOne);
routes.delete("/clientes/:id", controller_clientes.deleteOne);

//Rotas de Produtos
routes.post("/produtos", controller_produtos.create);
routes.get("/produtos", controller_produtos.searchAll);
routes.get("/produtos/:id", controller_produtos.searchId);
routes.put("/produtos/:id", controller_produtos.updateOne);
routes.delete("/produtos/:id", controller_produtos.deleteOne);

//Rotas de Aquisições
routes.post("/aquisicoes", controller_aquisicoes.create);
routes.get("/aquisicoes", controller_aquisicoes.searchAll);
routes.get("/aquisicoes/:id", controller_aquisicoes.searchId);
routes.put("/aquisicoes/:id", controller_aquisicoes.updateOne);
routes.delete("/aquisicoes/:id", controller_aquisicoes.deleteOne);

// Rotas de Usuários
routes.post("/usuario/create", controller_usuarios.createUser);

// Rota de Autenticação
routes.post("/auth", controller_login.autenticaUsuario);

//Rotas de Formulários
routes.post("/formularios/form1", controller_form1.create);
routes.post("/formularios/form1/buscar", controller_form1.searchOne);
routes.post("/formularios/form2", controller_form2.create);
routes.post("/formularios/form2/buscar", controller_form2.search);
routes.get("/formularios/relatorio", controller_form1.relatorio);

// Rotas de Acessos
routes.post("/createAcesso", controller_acessos.create);
routes.get("/acessos/:id", controller_acessos.searchId);
routes.put("/acessos/:id", controller_acessos.updateOne);
routes.delete("/acessos/:id", controller_acessos.deleteOne);

module.exports = routes;

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

const middleware_autenticacao = require("../middlewares/middleware_autenticacao");

routes.get("/", controller_funcionarios.welcome);

// Rotas de Funcionários
routes.post(
  "/funcionarios",
  middleware_autenticacao.auth,
  controller_funcionarios.create
);
routes.get(
  "/funcionarios",
  middleware_autenticacao.auth,
  controller_funcionarios.searchAll
);
routes.get(
  "/funcionarios/:nomeFuncionario",
  middleware_autenticacao.auth,
  controller_funcionarios.search
);
routes.get(
  "/funcionarios/buscar/:id",
  middleware_autenticacao.auth,
  controller_funcionarios.search_Id
);
routes.put(
  "/funcionarios/:id",
  middleware_autenticacao.auth,
  controller_funcionarios.updateOne
);
routes.delete(
  "/funcionarios/:id",
  middleware_autenticacao.auth,
  controller_funcionarios.deleteOne
);

//Rotas de Clientes
routes.post(
  "/clientes",
  middleware_autenticacao.auth,
  controller_clientes.create
);
routes.get(
  "/clientes",
  middleware_autenticacao.auth,
  controller_clientes.searchAll
);
routes.get(
  "/clientes/:id",
  middleware_autenticacao.auth,
  controller_clientes.search
);
routes.put(
  "/clientes/:id",
  middleware_autenticacao.auth,
  controller_clientes.updateOne
);
routes.delete(
  "/clientes/:id",
  middleware_autenticacao.auth,
  controller_clientes.deleteOne
);

//Rotas de Produtos
routes.post(
  "/produtos",
  middleware_autenticacao.auth,
  controller_produtos.create
);
routes.get(
  "/produtos",
  middleware_autenticacao.auth,
  controller_produtos.searchAll
);
routes.get(
  "/produtos/:id",
  middleware_autenticacao.auth,
  controller_produtos.searchId
);
routes.put(
  "/produtos/:id",
  middleware_autenticacao.auth,
  controller_produtos.updateOne
);
routes.delete(
  "/produtos/:id",
  middleware_autenticacao.auth,
  controller_produtos.deleteOne
);

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
routes.post(
  "/formularios/form1",
  middleware_autenticacao.auth,
  controller_form1.create
);
routes.post(
  "/formularios/form1/buscar",
  middleware_autenticacao.auth,
  controller_form1.searchOne
);
routes.post(
  "/formularios/form2",
  middleware_autenticacao.auth,
  controller_form2.create
);
routes.post(
  "/formularios/form2/buscar",
  middleware_autenticacao.auth,
  controller_form2.search
);

module.exports = routes;

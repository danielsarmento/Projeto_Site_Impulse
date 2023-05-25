const express = require("express");
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = 3333;
const cors = require("cors");
const swaggerFile = require("./src/swagger.json")
const routes = require("./src/routes/routes");

require('dotenv').config();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const servidor = app.listen(PORT, () => {
  console.log(`Servidor disponível em http://localhost:${PORT}`);
});

module.exports = {servidor}

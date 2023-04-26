const express = require("express");
const app = express();
const PORT = 3333;
const cors = require("cors");
const routes = require("./src/routes/routes");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const servidor = app.listen(PORT, () => {
  console.log(`Servidor disponível em http://localhost:${PORT}`);
});

module.exports = {servidor}

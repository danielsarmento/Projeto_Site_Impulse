const Omie = require('omie-api-node');
const appSecret = '3fd5578365c201753abfc7e784491f0b';
const appKey = '2787727545603';
const OmieClient = new Omie({ appSecret, appKey });

OmieClient.registerAll();

/* OmieClient.geral.clientes.ListarClientes({
    "pagina": 1,
    "registros_por_pagina": 50,
    "apenas_importado_api": "N"
  }).then((body) => {console.log(body)}).catch((err) => { console.error(err)}) */

/* OmieClient.financas.dre.ListarCadastroDre({
    "apenasContasAtivas": "S"
  }).then((body) => {console.log(body)}).catch((err) => { console.error(err)}) */

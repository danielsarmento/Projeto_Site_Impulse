-- CreateTable
CREATE TABLE "aquisicoes" (
    "id" SERIAL NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "dataAdquirido" TIMESTAMP(3) NOT NULL,
    "dataRetirada" TIMESTAMP(3) NOT NULL,
    "situacao" TEXT NOT NULL,
    "valorMensal" TEXT NOT NULL,

    CONSTRAINT "aquisicoes_pkey" PRIMARY KEY ("id")
);

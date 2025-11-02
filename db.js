const { PrismaClient } = require("@prisma/client");

// Inicializa o cliente Prisma
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Função para desconectar o banco em caso de erro ou encerramento
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit();
});

module.exports = prisma;

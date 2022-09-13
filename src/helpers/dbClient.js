const { PrismaClient } = require("@prisma/client");
const dbClient = new PrismaClient();

exports.dbClient = dbClient;

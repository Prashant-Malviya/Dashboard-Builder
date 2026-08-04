// Single shared Prisma Client instance used across the app.
// Prevents exhausting DB connections by re-instantiating the client everywhere.

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;

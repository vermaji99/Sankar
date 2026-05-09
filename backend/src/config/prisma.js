require('dotenv').config({ override: true });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

prisma.$connect()
  .then(() => console.log('Prisma connected to database'))
  .catch((err) => console.error('Prisma connection error:', err));

module.exports = prisma;

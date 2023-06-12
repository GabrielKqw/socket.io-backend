import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  constructor() {
    prisma.$connect();
  }

  user = prisma.user;

  $disconnect() {
    prisma.$disconnect();
  }
}

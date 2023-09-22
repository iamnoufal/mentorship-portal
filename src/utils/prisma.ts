import { PrismaClient } from "@prisma/client";
// init prisma client
const prisma = new PrismaClient();
// export prisma client as prisma
export default prisma;

import { PrismaClient } from '@prisma/client';
// I didn't know we could mix modules.export and import like this
// maybe related to ts-node compilerOptions CommonJS ?
import {
  invoices,
  customers,
  revenue,
  users,
} from '../app/lib/placeholder-data.js';
import bcrypt from 'bcrypt';
import { custom } from 'zod';

/*
 * Note: caution where npx prismage generate is typed:
 * 
 * * if in the ../ folder, where .env resides, .env will be well loaded
 * * if in this folder, .env is badly loaded
 * 
 * npx prisma generate
 * Environment variables loaded from .env
 * Prisma schema loaded from prisma/schema.prisma
 * 
 * Next seems unaffected though, the issue is only where running this script
 * with npx ts-node
 * 
 * 
 */

async function main() {
  // TODO: maybe a way to make it DRY
  // but my goal for now is just to move forward on the tutorial
  // with a local database and an ORM
  await prisma.users.createMany({
    data: users,
    skipDuplicates: true
  });

  await prisma.customers.createMany({
    data: customers,
    skipDuplicates: true
  });

  await prisma.revenue.createMany({
    data: revenue,
    skipDuplicates: true
  });

  await prisma.customers.createMany({
    data: customers,
    skipDuplicates: true
  });

  // TOODO: invoices need customers
  await prisma.invoices.createMany({
    data: invoices,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
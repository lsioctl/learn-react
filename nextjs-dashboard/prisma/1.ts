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

const prisma = new PrismaClient();

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
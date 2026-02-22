import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const count = await prisma.lead.count();
  if (count > 0) {
    console.log("Leads already exist, skipping seed");
    return;
  }

  await prisma.lead.createMany({
    data: [
      { name: "Демо Лид", contact: "demo@example.com", consent: true },
      { name: "Test User", contact: "@testuser", consent: true },
    ],
  });
  console.log("Seed: created 2 demo leads");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

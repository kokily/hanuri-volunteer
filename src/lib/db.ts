import { PrismaClient } from "@prisma/client";

const gloablForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  gloablForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  gloablForPrisma.prisma = db;
}

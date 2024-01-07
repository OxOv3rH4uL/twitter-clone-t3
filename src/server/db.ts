import { PrismaClient } from "@prisma/client";
import { Return } from "@prisma/client/runtime/library";

import { env } from "~/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined | ReturnType<typeof prismaClientSingleton>;
};
const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      post: {
        fullName: {
          needs: { content: true, authorId: true },
          compute(user: { content: any; authorId: any; }) {
            return `${user.content} ${user.authorId}`
          },
        },
      },
    },
  })
}

export const db =
  globalForPrisma.prisma ?? prismaClientSingleton();
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

  

  if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

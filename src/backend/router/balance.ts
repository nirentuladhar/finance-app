import { t } from "../trpc";
import { z } from "zod";

export const balanceRouter = t.router({
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.balance.findMany({
      include: {
        SubCategory: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
  }),
});

import { t } from "../trpc";
import { z } from "zod";

export const balanceRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        amount: z.number().positive(),
        date: z.date(),
        subCategoryId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.balance.create({
        data: {
          amount: input.amount,
          date: input.date,
          subCategoryId: input.subCategoryId,
        },
      });
    }),

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

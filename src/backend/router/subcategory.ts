import { t } from "../trpc";
import { z } from "zod";

export const categoryRouter = t.router({
  create: t.procedure
    .input(z.object({ name: z.string(), categoryId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.subCategory.create({
        data: {
          name: input.name,
          categoryId: input.categoryId,
        },
      });
    }),

  update: t.procedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.subCategory.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      });
    }),
  getAllByCategories: t.procedure
    .input(z.object({ categoryId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.subCategory.findMany({
        where: {
          categoryId: input.categoryId,
        },
      });
    }),
});

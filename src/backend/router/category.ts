import { t } from "../trpc";
import { z } from "zod";

export const categoryRouter = t.router({
  create: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
        },
      });
    }),

  update: t.procedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.category.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      });
    }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany();
  }),
  getAllWithSubCategories: t.procedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        SubCategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }),
});

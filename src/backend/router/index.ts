// src/server/router/index.ts
import { t } from "../trpc";
import { balanceRouter } from "./balance";
import { categoryRouter } from "./category";
import { subCategoryRouter } from "./subcategory";

export const appRouter = t.router({
  category: categoryRouter,
  balance: balanceRouter,
  subCategory: subCategoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

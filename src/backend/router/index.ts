// src/server/router/index.ts
import { t } from "../trpc";
import { balanceRouter } from "./balance";
import { categoryRouter } from "./category";
import { exampleRouter } from "./example";

export const appRouter = t.router({
  example: exampleRouter,
  category: categoryRouter,
  balance: balanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

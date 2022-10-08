// src/server/router/index.ts
import { t } from "../trpc";
import { categoryRouter } from "./category";
import { exampleRouter } from "./example";

export const appRouter = t.router({
  example: exampleRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

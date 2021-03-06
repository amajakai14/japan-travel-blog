// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { userRouter } from "./users.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("users.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import { router } from "./trcp";
import { apiRouter as api } from "./api";

export const appRouter = router({ api });

export type AppRouter = typeof appRouter;

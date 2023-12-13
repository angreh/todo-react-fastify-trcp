import { createTRPCProxyClient, httpLink } from "@trpc/client";

import type { AppRouter } from "../../../api/src/routes";

export default createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: "http://localhost:3030/trpc",
    }),
  ],
});

import { useQuery } from "@tanstack/react-query";
import server from "../utils/trpcServer";

export function useFetchTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      return await server.api.getAll.query();
    },
  });
}

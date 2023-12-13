import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Todos from "./components/Todos";
import Wrapper from "./components/Wrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Todos />
        </Wrapper>
      </QueryClientProvider>
    </>
  );
}

export default App;

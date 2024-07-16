// import viteLogo from "/vite.svg";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";

import Header from "$src/layout/Header";

export function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
export default App;

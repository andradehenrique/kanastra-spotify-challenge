import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { queryClient } from '@/lib/queryClient';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { Header, Footer } from '@/components/layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <Outlet />
            <Footer />
          </div>

          {/* DevTools - apenas em desenvolvimento */}
          <ReactQueryDevtools initialIsOpen={false} />
        </FavoritesProvider>
      </QueryClientProvider>
      <TanStackRouterDevtools />
    </>
  );
}

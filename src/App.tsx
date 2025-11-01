import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { Button } from './components/ui/button';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
        <h1 className="mt-4 text-2xl font-bold">Spotify Challenge</h1>
      </div>

      {/* DevTools apenas em desenvolvimento */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

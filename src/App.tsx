import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './lib/queryClient';
import { useTranslation } from './hooks';
import { FavoriteFormExample, LanguageToggle } from './components/examples';

function App() {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-svh flex-col items-center justify-center gap-8 p-8">
        <div className="flex w-full max-w-4xl items-center justify-between">
          <h1 className="text-3xl font-bold">{t('header.title')}</h1>
          <LanguageToggle />
        </div>

        <div className="w-full max-w-4xl">
          <FavoriteFormExample />
        </div>
      </div>

      {/* DevTools apenas em desenvolvimento */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

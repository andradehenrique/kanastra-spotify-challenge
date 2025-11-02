import { createFileRoute } from '@tanstack/react-router';
import { PageWrapper } from '@/components/layout';
import { useTranslation } from '@/hooks';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">{t('home.title')}</h1>
          <p className="text-muted-foreground">{t('home.searchPlaceholder')}</p>
        </div>

        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            🎵 Busca e listagem de artistas será implementada em breve
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

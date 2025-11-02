import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface ErrorStateProps {
  error: Error | null;
}

export function ErrorState({ error }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-destructive/10 text-destructive mb-4 rounded-full p-4">
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{t('common.error')}</h3>
      <p className="text-muted-foreground mb-4 text-center text-sm">
        {error instanceof Error ? error.message : 'An unexpected error occurred'}
      </p>
      <Button onClick={() => window.location.reload()} variant="link" size="sm">
        Try again
      </Button>
    </div>
  );
}

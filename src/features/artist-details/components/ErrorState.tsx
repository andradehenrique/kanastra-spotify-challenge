import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui';
import { useTranslation } from '@/hooks';

interface ErrorStateProps {
  error?: Error | null;
}

export function ErrorState({ error }: ErrorStateProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate({ to: '/' });
  };

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center">
      {/* Ícone de Erro */}
      <div className="bg-destructive/10 text-destructive rounded-full p-6">
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Mensagem de Erro */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t('common.error')}</h2>
        {error && (
          <p className="text-muted-foreground text-sm">
            {error.message || 'An unexpected error occurred'}
          </p>
        )}
      </div>

      {/* Botão para voltar */}
      <Button onClick={handleGoBack} variant="outline">
        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t('common.back')}
      </Button>
    </div>
  );
}

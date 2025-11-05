import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui';
import { useTranslation } from '@/hooks';
import { AlertCircle, ArrowLeft } from '@/components/ui/icons';

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
        <AlertCircle className="h-12 w-12" />
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
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('common.back')}
      </Button>
    </div>
  );
}

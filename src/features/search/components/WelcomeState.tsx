import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

interface WelcomeStateProps {
  onSuggestionClick: (term: string) => void;
}

export function WelcomeState({ onSuggestionClick }: WelcomeStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{t('home.welcomeTitle')}</h3>
      <p className="text-muted-foreground mb-4 max-w-md text-center text-sm">
        {t('home.welcomeDescription')}
      </p>
      <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-2 text-xs">
        <span>{t('home.trySearching')}:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick('Coldplay')}
          className="h-7"
        >
          Coldplay
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick('Taylor Swift')}
          className="h-7"
        >
          Taylor Swift
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSuggestionClick('The Beatles')}
          className="h-7"
        >
          The Beatles
        </Button>
      </div>
    </div>
  );
}

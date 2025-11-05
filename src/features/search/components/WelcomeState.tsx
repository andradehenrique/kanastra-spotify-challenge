import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { Music } from '@/components/ui/icons';

interface WelcomeStateProps {
  onSuggestionClick: (term: string) => void;
}

export function WelcomeState({ onSuggestionClick }: WelcomeStateProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-primary/10 text-primary mb-4 rounded-full p-4">
        <Music className="h-12 w-12" />
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

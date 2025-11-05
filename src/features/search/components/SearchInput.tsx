import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { Search, Loader2 } from '@/components/ui/icons';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  isFetching?: boolean;
  showHint?: boolean;
}

export function SearchInput({ value, onChange, isFetching, showHint }: SearchInputProps) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
        <Input
          type="text"
          placeholder={t('home.searchPlaceholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 pr-10 pl-10 text-base"
          aria-label={t('home.searchByArtist')}
        />
        {/* Indicador de loading durante o fetch */}
        {isFetching && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
          </div>
        )}
      </div>

      {/* Hint text */}
      {showHint && (
        <p className="text-muted-foreground text-center text-sm">{t('home.searchHint')}</p>
      )}
    </div>
  );
}

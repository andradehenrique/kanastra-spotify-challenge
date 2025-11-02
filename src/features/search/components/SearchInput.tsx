import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

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
        <svg
          className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
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
            <svg
              className="text-muted-foreground h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
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

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useSearchArtists } from '@/hooks/useSpotifyApi';
import { useTranslation } from '@/hooks/useTranslation';
import { debounce } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArtistCard } from '@/components/ui/artist-card';
import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

const ITEMS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 600; // 600ms

type SearchType = 'artist' | 'album';

export function ArtistSearchContainer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Estados locais
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState<SearchType>('artist');

  // Debounce da busca usando useMemo para criar a função apenas uma vez
  const debouncedSearch = useMemo(() => {
    const handler = (value: string) => {
      setDebouncedSearchTerm(value);
      setCurrentPage(1); // Reset para página 1 quando a busca muda
    };
    return debounce(handler as (...args: unknown[]) => void, DEBOUNCE_DELAY) as (
      value: string
    ) => void;
  }, []);

  // Efeito para aplicar o debounce quando o searchTerm muda
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // Calcular offset para paginação
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Query do React Query
  const { data, isLoading, isError, error, isFetching } = useSearchArtists(
    debouncedSearchTerm,
    ITEMS_PER_PAGE,
    offset,
    debouncedSearchTerm.length >= 2 // Só busca se tiver pelo menos 2 caracteres
  );

  // Calcular total de páginas
  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  // Handler para mudança de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll suave para o topo ao mudar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler para clicar no card do artista
  const handleArtistClick = (artistId: string) => {
    navigate({ to: `/artist/${artistId}` });
  };

  // Handler para mudança no input de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Renderiza loading state (Skeletons)
  const renderLoadingState = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-3 p-4">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );

  // Renderiza estado de erro
  const renderErrorState = () => (
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

  // Renderiza empty state (nenhum resultado encontrado ou estado inicial)
  const renderEmptyState = () => {
    // Se ainda não buscou nada - Estado Inicial
    if (!debouncedSearchTerm) {
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
              onClick={() => setSearchTerm('Coldplay')}
              className="h-7"
            >
              Coldplay
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm('Taylor Swift')}
              className="h-7"
            >
              Taylor Swift
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm('The Beatles')}
              className="h-7"
            >
              The Beatles
            </Button>
          </div>
        </div>
      );
    }

    // Se buscou mas não encontrou resultados
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-muted mb-4 rounded-full p-4">
          <svg
            className="text-muted-foreground h-12 w-12"
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
        </div>
        <h3 className="mb-2 text-lg font-semibold">{t('common.noResults')}</h3>
        <p className="text-muted-foreground mb-4 max-w-md text-center text-sm">
          {t('home.noResultsFor', { term: debouncedSearchTerm })}
        </p>
        <p className="text-muted-foreground mb-4 text-center text-xs">
          {t('home.tryDifferentSearch')}
        </p>
        <Button
          onClick={() => {
            setSearchTerm('');
            setDebouncedSearchTerm('');
          }}
          variant="outline"
          size="sm"
        >
          {t('home.clearSearch')}
        </Button>
      </div>
    );
  };

  // Renderiza a grid de artistas
  const renderArtistsGrid = () => {
    if (!data?.items || data.items.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="space-y-6">
        {/* Título dos resultados */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {t('home.resultsFor', { term: debouncedSearchTerm })}
          </h2>
          <Button
            onClick={() => {
              setSearchTerm('');
              setDebouncedSearchTerm('');
              setCurrentPage(1);
            }}
            variant="ghost"
            size="sm"
          >
            {t('home.clearSearch')}
          </Button>
        </div>

        {/* Grid de artistas */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.items.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onClick={() => handleArtistClick(artist.id)}
            />
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={data.total}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Campo de Busca Centralizado */}
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
            value={searchTerm}
            onChange={handleSearchChange}
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
        {searchTerm.length > 0 && searchTerm.length < 2 && (
          <p className="text-muted-foreground text-center text-sm">{t('home.searchHint')}</p>
        )}

        {/* Button Group - Aparece quando há busca */}
        {debouncedSearchTerm && !isLoading && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={searchType === 'artist' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchType('artist')}
              className="gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {t('home.artists')}
            </Button>
            <Button
              variant={searchType === 'album' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchType('album')}
              disabled
              className="gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              {t('home.albums')}
            </Button>
          </div>
        )}
      </div>

      {/* Conteúdo Principal */}
      <div>
        {isLoading && renderLoadingState()}
        {isError && renderErrorState()}
        {!isLoading && !isError && renderArtistsGrid()}
      </div>
    </div>
  );
}

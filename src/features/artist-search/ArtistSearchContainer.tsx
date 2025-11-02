import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSearchArtists } from '@/hooks/useSpotifyApi';
import { debounce } from '@/lib/utils';
import {
  SearchInput,
  SearchTypeToggle,
  WelcomeState,
  EmptyResultsState,
  ErrorState,
  LoadingState,
  ArtistsGrid,
} from './components';

const ITEMS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 600; // 600ms

type SearchType = 'artist' | 'album';

export function ArtistSearchContainer() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/' });

  const urlSearchTerm = searchParams.q || '';
  const currentPage = searchParams.page || 1;
  const searchType = searchParams.type || 'artist';

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(urlSearchTerm);

  // Ref para evitar loop de sincronização
  const previousUrlTermRef = useRef(urlSearchTerm);

  const debouncedUpdateSearch = useMemo(() => {
    return debounce((...args: unknown[]) => {
      const value = args[0] as string;
      setDebouncedSearchTerm(value);
      previousUrlTermRef.current = value;

      if (value) {
        navigate({
          to: '/',
          search: (prev) => ({
            ...prev,
            q: value,
            type: prev.type || 'artist',
            page: 1,
          }),
          replace: true,
        });
      }
    }, DEBOUNCE_DELAY);
  }, [navigate]);

  useEffect(() => {
    debouncedUpdateSearch(searchTerm);
  }, [searchTerm, debouncedUpdateSearch]);

  // Sincroniza apenas quando URL muda externamente (botão voltar, sugestão clicada)
  useEffect(() => {
    if (urlSearchTerm !== previousUrlTermRef.current) {
      setSearchTerm(urlSearchTerm);
      setDebouncedSearchTerm(urlSearchTerm);
      previousUrlTermRef.current = urlSearchTerm;
    }
  }, [urlSearchTerm]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, isError, error, isFetching } = useSearchArtists(
    debouncedSearchTerm,
    ITEMS_PER_PAGE,
    offset,
    debouncedSearchTerm.length >= 2
  );

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const handlePageChange = (page: number) => {
    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        page,
      }),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArtistClick = (artistId: string) => {
    navigate({ to: `/artist/${artistId}` });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    navigate({
      to: '/',
      search: {},
      replace: true,
    });
  };

  const handleSearchTypeChange = (type: SearchType) => {
    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        type,
        page: 1,
      }),
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState itemCount={ITEMS_PER_PAGE} />;
    }

    if (isError) {
      return <ErrorState error={error} />;
    }

    if (!data?.items || data.items.length === 0) {
      if (!debouncedSearchTerm) {
        return (
          <WelcomeState
            onSuggestionClick={(value: string) => {
              navigate({
                to: '/',
                search: { q: value, type: searchType, page: 1 },
              });
            }}
          />
        );
      }
      return (
        <EmptyResultsState searchTerm={debouncedSearchTerm} onClearSearch={handleClearSearch} />
      );
    }

    return (
      <ArtistsGrid
        artists={data.items}
        searchTerm={debouncedSearchTerm}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={data.total}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
        onClearSearch={handleClearSearch}
        onArtistClick={handleArtistClick}
      />
    );
  };

  return (
    <div className="space-y-8">
      <SearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        isFetching={isFetching}
        showHint={searchTerm.length > 0 && searchTerm.length < 2}
      />

      <SearchTypeToggle
        searchType={searchType}
        onSearchTypeChange={handleSearchTypeChange}
        show={!!debouncedSearchTerm && !isLoading}
      />

      <div>{renderContent()}</div>
    </div>
  );
}

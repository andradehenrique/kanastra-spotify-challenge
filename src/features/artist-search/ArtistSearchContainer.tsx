import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState<SearchType>('artist');

  const debouncedSearch = useMemo(() => {
    const handler = (value: string) => {
      setDebouncedSearchTerm(value);
      setCurrentPage(1);
    };
    return debounce(handler as (...args: unknown[]) => void, DEBOUNCE_DELAY) as (
      value: string
    ) => void;
  }, []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, isError, error, isFetching } = useSearchArtists(
    debouncedSearchTerm,
    ITEMS_PER_PAGE,
    offset,
    debouncedSearchTerm.length >= 2
  );

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    setCurrentPage(1);
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
        return <WelcomeState onSuggestionClick={setSearchTerm} />;
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
        onSearchTypeChange={setSearchType}
        show={!!debouncedSearchTerm && !isLoading}
      />

      <div>{renderContent()}</div>
    </div>
  );
}

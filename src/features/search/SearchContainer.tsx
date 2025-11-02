import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSearchArtists, useSearchAlbums } from '@/hooks/useSpotifyApi';
import { debounce } from '@/lib/utils';
import { ArtistCard, AlbumCard } from '@/components/ui';
import {
  SearchInput,
  SearchTypeToggle,
  WelcomeState,
  EmptyResultsState,
  ErrorState,
  LoadingState,
  ItemsGrid,
} from './components';

const ITEMS_PER_PAGE = 20;
const DEBOUNCE_DELAY = 600; // 600ms

type SearchType = 'artist' | 'album';

export function SearchContainer() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/' });

  const urlSearchTerm = searchParams.q || '';
  const currentPage = searchParams.page || 1;
  const searchType = searchParams.type || 'artist';

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(urlSearchTerm);

  // Ref para evitar loop de sincronização
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (urlSearchTerm !== previousUrlTermRef.current) {
      setSearchTerm(urlSearchTerm);
      setDebouncedSearchTerm(urlSearchTerm);
      previousUrlTermRef.current = urlSearchTerm;
    }
  }, [urlSearchTerm]);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const {
    data: artistsData,
    isLoading: isLoadingArtists,
    isError: isErrorArtists,
    error: errorArtists,
    isFetching: isFetchingArtists,
  } = useSearchArtists(
    debouncedSearchTerm,
    ITEMS_PER_PAGE,
    offset,
    debouncedSearchTerm.length >= 2 && searchType === 'artist'
  );

  const {
    data: albumsData,
    isLoading: isLoadingAlbums,
    isError: isErrorAlbums,
    error: errorAlbums,
    isFetching: isFetchingAlbums,
  } = useSearchAlbums(
    debouncedSearchTerm,
    ITEMS_PER_PAGE,
    offset,
    debouncedSearchTerm.length >= 2 && searchType === 'album'
  );

  // Dados baseados no tipo de busca
  const data = searchType === 'artist' ? artistsData : albumsData;
  const isLoading = searchType === 'artist' ? isLoadingArtists : isLoadingAlbums;
  const isError = searchType === 'artist' ? isErrorArtists : isErrorAlbums;
  const error = searchType === 'artist' ? errorArtists : errorAlbums;
  const isFetching = searchType === 'artist' ? isFetchingArtists : isFetchingAlbums;

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const handlePageChange = (page: number) => {
    navigate({
      to: '/',
      search: (prev) => ({
        ...prev,
        page,
      }),
    });
  };

  const handleArtistClick = (artistId: string) => {
    navigate({ to: `/artist/${artistId}` });
  };

  const handleAlbumClick = (albumUrl: string) => {
    window.open(albumUrl, '_blank', 'noopener,noreferrer');
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

    if (searchType === 'album' && albumsData) {
      return (
        <ItemsGrid
          items={albumsData.items}
          searchTerm={debouncedSearchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={albumsData.total}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          onClearSearch={handleClearSearch}
          getItemKey={(album) => album.id}
          renderItem={(album) => (
            <AlbumCard
              album={album}
              onClick={() => handleAlbumClick(album.external_urls.spotify)}
            />
          )}
        />
      );
    }

    if (searchType === 'artist' && artistsData) {
      return (
        <ItemsGrid
          items={artistsData.items}
          searchTerm={debouncedSearchTerm}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={artistsData.total}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
          onClearSearch={handleClearSearch}
          getItemKey={(artist) => artist.id}
          renderItem={(artist) => (
            <ArtistCard artist={artist} onClick={() => handleArtistClick(artist.id)} />
          )}
        />
      );
    }

    return null;
  };

  return (
    <div className="space-y-8" ref={containerRef}>
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

import { useArtistDetails, useArtistTopTracks } from '@/hooks/useSpotifyApi';
import { useTranslation } from '@/hooks';
import { ArtistHeader, TopTracksTable, LoadingState, ErrorState } from './components';

interface ArtistDetailsContainerProps {
  artistId: string;
}

export function ArtistDetailsContainer({ artistId }: ArtistDetailsContainerProps) {
  const { t } = useTranslation();

  // Buscar detalhes do artista
  const {
    data: artist,
    isLoading: isLoadingArtist,
    isError: isErrorArtist,
    error: errorArtist,
  } = useArtistDetails(artistId);

  // Buscar top tracks do artista
  const {
    data: topTracks,
    isLoading: isLoadingTracks,
    isError: isErrorTracks,
    error: errorTracks,
  } = useArtistTopTracks(artistId);

  // Estados de loading
  const isLoading = isLoadingArtist || isLoadingTracks;
  const isError = isErrorArtist || isErrorTracks;
  const error = errorArtist || errorTracks;

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  if (!artist) {
    return <ErrorState />;
  }

  const handleGoBack = () => {
    // Usa history.back() para voltar com os parâmetros preservados
    window.history.back();
  };

  return (
    <div className="space-y-8">
      {/* Link de voltar aos resultados */}
      <button
        onClick={handleGoBack}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-medium transition-colors"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t('common.back')}
      </button>

      <div className="space-y-12">
        {/* Header do Artista */}
        <ArtistHeader artist={artist} />

        {/* Tabela de Top Tracks */}
        {topTracks && topTracks.length > 0 && <TopTracksTable tracks={topTracks} />}
      </div>
    </div>
  );
}

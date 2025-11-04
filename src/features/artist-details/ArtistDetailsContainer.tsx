import { useEffect } from 'react';
import { useArtistDetails, useArtistTopTracks } from '@/hooks/useSpotifyApi';
import { useTranslation } from '@/hooks';
import { ArtistHeader, TopTracksTable, AlbumsTable, LoadingState, ErrorState } from './components';
import { TopTracksPopularityChart, PopularityDurationScatterChart } from '@/components/charts';
import { Tabs, TabsContent, TabsList, TabsTrigger, Button } from '@/components/ui';

interface ArtistDetailsContainerProps {
  artistId: string;
}

export function ArtistDetailsContainer({ artistId }: ArtistDetailsContainerProps) {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [artistId]);

  const {
    data: artist,
    isLoading: isLoadingArtist,
    isError: isErrorArtist,
    error: errorArtist,
  } = useArtistDetails(artistId);

  const {
    data: topTracks,
    isLoading: isLoadingTracks,
    isError: isErrorTracks,
    error: errorTracks,
  } = useArtistTopTracks(artistId);

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
    window.history.back();
  };

  return (
    <div className="space-y-8">
      <Button onClick={handleGoBack} variant="ghost" size="sm" className="gap-2">
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
      </Button>

      <div className="space-y-8">
        <ArtistHeader artist={artist} />

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">{t('artist.tabs.overview')}</TabsTrigger>
            <TabsTrigger value="charts">{t('artist.tabs.charts')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 pt-6">
            {topTracks && topTracks.length > 0 && <TopTracksTable tracks={topTracks} />}

            <AlbumsTable artistId={artistId} />
          </TabsContent>

          {/* Tab: Análise e Gráficos */}
          <TabsContent value="charts" className="space-y-8 pt-6">
            {topTracks && topTracks.length > 0 ? (
              <div className="grid gap-8 lg:grid-cols-1">
                <TopTracksPopularityChart tracks={topTracks} />

                <PopularityDurationScatterChart tracks={topTracks} />
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground text-sm">{t('common.noResults')}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

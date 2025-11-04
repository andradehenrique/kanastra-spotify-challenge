import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Search, Music, X } from 'lucide-react';
import { Button, Input, Card, Textarea } from '@/components/ui';
import { favoriteSongSchema, type FavoriteSongFormData } from '@/schemas';
import { useFavorites, useTranslation } from '@/hooks';
import { useSearchTracks } from '@/hooks/useSpotifyApi';
import type { SpotifyTrack } from '@/api';

export function AddManualForm() {
  const { t } = useTranslation();
  const { addSong } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: tracksData, isLoading: isLoadingTracks } = useSearchTracks(
    debouncedQuery,
    10,
    0,
    debouncedQuery.length > 0
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FavoriteSongFormData>({
    resolver: zodResolver(favoriteSongSchema),
  });

  const handleSelectTrack = (track: SpotifyTrack) => {
    setSelectedTrack(track);
    setValue('songName', track.name);
    setValue('artistName', track.artists.map((a) => a.name).join(', '));
    setValue('albumName', track.album.name);
    setValue('spotifyTrackId', track.id);
    setValue('spotifyArtistId', track.artists[0]?.id || '');
    setValue('imageUrl', track.album.images[0]?.url || '');
    setSearchQuery('');
    setShowResults(false);
  };

  // Limpa a seleção
  const handleClearSelection = () => {
    setSelectedTrack(null);
    reset();
  };

  const onSubmit = (data: FavoriteSongFormData) => {
    try {
      addSong({
        songName: data.songName,
        artistName: data.artistName,
        albumName: data.albumName,
        notes: data.notes,
        spotifyTrackId: data.spotifyTrackId,
        spotifyArtistId: data.spotifyArtistId,
        imageUrl: data.imageUrl,
      });
      toast.success(t('favorites.form.success'));
      reset();
      setSelectedTrack(null);
    } catch (error) {
      toast.error(t('favorites.form.error'));
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">{t('favorites.addFavorite')}</h2>

      {!selectedTrack ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="trackSearch" className="mb-1.5 block text-sm font-medium">
              {t('favorites.form.searchTrack')}
              <span className="text-destructive ml-1">*</span>
            </label>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="trackSearch"
                placeholder={t('favorites.form.searchTrackPlaceholder')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="pl-10"
              />
            </div>
            <p className="text-muted-foreground mt-1.5 text-xs">
              {t('favorites.form.searchTrackHint')}
            </p>
          </div>

          {showResults && debouncedQuery.length > 0 && (
            <div className="bg-background rounded-lg border">
              {isLoadingTracks ? (
                <div className="text-muted-foreground p-4 text-center text-sm">
                  {t('common.loading')}
                </div>
              ) : tracksData && tracksData.items.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {tracksData.items.map((track) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => handleSelectTrack(track)}
                      className="hover:bg-accent flex w-full items-start gap-3 border-b p-3 text-left transition-colors last:border-b-0"
                    >
                      {track.album.images[0] ? (
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          className="h-12 w-12 rounded object-cover"
                        />
                      ) : (
                        <div className="bg-muted flex h-12 w-12 items-center justify-center rounded">
                          <Music className="text-muted-foreground h-6 w-6" />
                        </div>
                      )}
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate font-medium">{track.name}</p>
                        <p className="text-muted-foreground truncate text-sm">
                          {track.artists.map((a) => a.name).join(', ')}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">{track.album.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground p-4 text-center text-sm">
                  {t('favorites.form.noTracksFound')}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-accent/50 rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">{t('favorites.form.selectedTrack')}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearSelection}
                className="h-8 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              {selectedTrack.album.images[0] ? (
                <img
                  src={selectedTrack.album.images[0].url}
                  alt={selectedTrack.name}
                  className="h-16 w-16 rounded object-cover"
                />
              ) : (
                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded">
                  <Music className="text-muted-foreground h-8 w-8" />
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-semibold">{selectedTrack.name}</p>
                <p className="text-muted-foreground truncate text-sm">
                  {selectedTrack.artists.map((a) => a.name).join(', ')}
                </p>
                <p className="text-muted-foreground truncate text-xs">{selectedTrack.album.name}</p>
              </div>
            </div>
          </div>

          <input type="hidden" {...register('songName')} />
          <input type="hidden" {...register('artistName')} />
          <input type="hidden" {...register('albumName')} />
          <input type="hidden" {...register('spotifyTrackId')} />
          <input type="hidden" {...register('spotifyArtistId')} />
          <input type="hidden" {...register('imageUrl')} />

          <div>
            <label htmlFor="notes" className="mb-1.5 block text-sm font-medium">
              {t('favorites.form.notes')}
            </label>
            <Textarea
              id="notes"
              placeholder={t('favorites.form.notesPlaceholder')}
              {...register('notes')}
              rows={3}
              aria-invalid={!!errors.notes}
            />
            {errors.notes && (
              <p className="text-destructive mt-1 text-sm">{t('favorites.validation.notesMax')}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? t('common.loading') : t('favorites.form.submit')}
          </Button>
        </form>
      )}
    </Card>
  );
}

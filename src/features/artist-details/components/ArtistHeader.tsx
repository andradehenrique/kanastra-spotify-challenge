import { Badge } from '@/components/ui';
import type { SpotifyArtist } from '@/@types/spotify';
import { useTranslation } from '@/hooks';

interface ArtistHeaderProps {
  artist: SpotifyArtist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  const { t } = useTranslation();
  const imageUrl = artist.images[0]?.url;

  return (
    <div className="flex flex-col gap-6 md:flex-row md:gap-8">
      {/* Imagem do Artista */}
      <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-lg md:w-64 md:shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artist.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="text-muted-foreground h-32 w-32"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Informações do Artista */}
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{artist.name}</h1>
        </div>

        {/* Estatísticas */}
        <div className="flex flex-wrap gap-6 text-sm">
          {/* Seguidores */}
          <div className="flex items-center gap-2">
            <svg
              className="text-muted-foreground h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <div>
              <span className="text-muted-foreground">{t('artist.followers')}: </span>
              <span className="font-semibold">{formatFollowers(artist.followers.total)}</span>
            </div>
          </div>

          {/* Popularidade */}
          <div className="flex items-center gap-2">
            <svg
              className="text-muted-foreground h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <div>
              <span className="text-muted-foreground">{t('artist.popularity')}: </span>
              <span className="font-semibold">{artist.popularity}/100</span>
            </div>
          </div>
        </div>

        {/* Gêneros */}
        {artist.genres.length > 0 && (
          <div>
            <h3 className="text-muted-foreground mb-2 text-sm font-medium">{t('artist.genres')}</h3>
            <div className="flex flex-wrap gap-2">
              {artist.genres.slice(0, 6).map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Link do Spotify */}
        <div>
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            {t('artist.listenOn')}
          </a>
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para formatar número de seguidores
function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1)}K`;
  }
  return count.toLocaleString();
}

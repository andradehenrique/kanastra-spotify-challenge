import { Badge, Card } from '@/components/ui';
import type { SpotifyArtist } from '@/@types/spotify';
import { useTranslation } from '@/hooks';
import { formatNumber } from '@/lib/utils';
import { User, Users, TrendingUp } from '@/components/ui/icons';

interface ArtistHeaderProps {
  artist: SpotifyArtist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  const { t } = useTranslation();
  const imageUrl = artist.images[0]?.url;

  return (
    <Card className="p-6">
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
              <User className="text-muted-foreground h-32 w-32" />
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
              <Users className="text-muted-foreground h-5 w-5" />
              <div>
                <span className="text-muted-foreground">{t('artist.followers')}: </span>
                <span className="font-semibold">{formatNumber(artist.followers.total)}</span>
              </div>
            </div>

            {/* Popularidade */}
            <div className="flex items-center gap-2">
              <TrendingUp className="text-muted-foreground h-5 w-5" />
              <div>
                <span className="text-muted-foreground">{t('artist.popularity')}: </span>
                <span className="font-semibold">{artist.popularity}/100</span>
              </div>
            </div>
          </div>

          {/* Gêneros */}
          {artist.genres.length > 0 && (
            <div>
              <h2 className="text-muted-foreground mb-2 text-sm font-medium">
                {t('artist.genres')}
              </h2>
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
              {t('artist.listenOn')}
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}

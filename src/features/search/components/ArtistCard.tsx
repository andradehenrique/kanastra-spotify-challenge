import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatNumber } from '@/lib/utils';
import { User, Users } from '@/components/ui/icons';
import type { SpotifyArtist } from '@/@types/spotify';

interface ArtistCardProps {
  artist: SpotifyArtist;
  onClick?: () => void;
}

export function ArtistCard({ artist, onClick }: ArtistCardProps) {
  const imageUrl = artist.images[0]?.url;
  const genres = artist.genres.slice(0, 3);

  return (
    <Card
      className="group h-full cursor-pointer overflow-hidden pt-0 transition-all hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      {/* Imagem do Artista */}
      <div className="bg-muted relative aspect-square w-full overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={artist.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="text-muted-foreground h-24 w-24" />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="space-y-3 px-4">
        {/* Nome do Artista */}
        <h3 className="group-hover:text-primary line-clamp-1 text-lg font-semibold transition-colors">
          {artist.name}
        </h3>

        {/* Gêneros */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        )}

        {/* Popularidade e Seguidores */}
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          {/* Barra de Popularidade */}
          <div className="flex flex-1 items-center gap-2">
            <span className="text-xs">Popularity</span>
            <div className="bg-muted h-1.5 max-w-20 flex-1 overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all"
                style={{ width: `${artist.popularity}%` }}
              />
            </div>
            <span className="text-xs font-medium">{artist.popularity}</span>
          </div>
        </div>

        {/* Seguidores */}
        {artist.followers?.total !== undefined && (
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Users className="h-3.5 w-3.5" />
            <span>{formatNumber(artist.followers.total)}</span>
          </div>
        )}
      </div>
    </Card>
  );
}

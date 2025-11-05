import { useState } from 'react';
import { useTranslation } from '@/hooks';
import { useArtistAlbums } from '@/hooks/useSpotifyApi';
import { formatDate, getAlbumTypeLabel } from '@/lib/utils';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui';
import { SimplePagination } from '@/components/ui/pagination';
import { Album } from '@/components/ui/icons';

interface AlbumsTableProps {
  artistId: string;
}

const ITEMS_PER_PAGE = 10;

export function AlbumsTable({ artistId }: AlbumsTableProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, isError } = useArtistAlbums(artistId, ITEMS_PER_PAGE, offset, true);

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const handleRowClick = (albumUrl: string) => {
    window.open(albumUrl, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{t('artist.albums')}</h2>
        <div className="bg-card border-border text-card-foreground rounded-lg border p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">{t('common.loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data || data.items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        {t('artist.albums')} ({data.total})
      </h2>

      <div className="bg-card border-border text-card-foreground rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead className="w-20">{t('albums.cover')}</TableHead>
                <TableHead>{t('albums.name')}</TableHead>
                <TableHead className="w-32">{t('albums.type')}</TableHead>
                <TableHead className="w-24 text-center">{t('albums.tracks')}</TableHead>
                <TableHead className="w-32">{t('albums.releaseDate')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((album, index) => (
                <TableRow
                  key={album.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(album.external_urls.spotify)}
                >
                  <TableCell className="text-muted-foreground font-medium">
                    {offset + index + 1}
                  </TableCell>
                  <TableCell>
                    {album.images && album.images.length > 0 ? (
                      <img
                        src={album.images[album.images.length - 1]?.url}
                        alt={album.name}
                        className="h-12 w-12 rounded object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="bg-muted flex h-12 w-12 items-center justify-center rounded">
                        <Album className="text-muted-foreground h-6 w-6" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{album.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-secondary text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                      {getAlbumTypeLabel(album.album_type)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{album.total_tracks}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(album.release_date)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="border-border flex items-center justify-center border-t px-6 py-4">
            <SimplePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

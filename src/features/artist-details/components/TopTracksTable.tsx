import { useState, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Pagination,
} from '@/components/ui';
import type { SpotifyTrack } from '@/@types/spotify';
import { useTranslation } from '@/hooks';

interface TopTracksTableProps {
  tracks: SpotifyTrack[];
  itemsPerPage?: number;
}

export function TopTracksTable({ tracks, itemsPerPage = 10 }: TopTracksTableProps) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(tracks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTracks = tracks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRowClick = (trackUrl: string) => {
    window.open(trackUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={tableRef} className="space-y-4">
      {/* Header da seção */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('artist.topTracks')}</h2>
        <span className="text-muted-foreground text-sm">
          {tracks.length} {tracks.length === 1 ? t('tracks.title').slice(0, -1) : t('tracks.title')}
        </span>
      </div>

      {/* Tabela */}
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>{t('tracks.name')}</TableHead>
              <TableHead>{t('tracks.album')}</TableHead>
              <TableHead className="text-center">{t('tracks.duration')}</TableHead>
              <TableHead className="text-center">{t('tracks.popularity')}</TableHead>
              <TableHead className="text-center">{t('tracks.preview')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTracks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <span className="text-muted-foreground">{t('common.noResults')}</span>
                </TableCell>
              </TableRow>
            ) : (
              currentTracks.map((track, index) => (
                <TableRow
                  key={track.id}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(track.external_urls.spotify)}
                >
                  <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {track.album.images[0]?.url && (
                        <img
                          src={track.album.images[0].url}
                          alt={track.name}
                          className="h-10 w-10 rounded object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{track.name}</p>
                        <p className="text-muted-foreground truncate text-sm">
                          {track.artists.map((a) => a.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground text-sm">{track.album.name}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-muted-foreground text-sm">
                      {formatDuration(track.duration_ms)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-muted h-1.5 w-16 overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${track.popularity}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs font-medium">
                        {track.popularity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {track.preview_url ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const audio = new Audio(track.preview_url!);
                          audio.play();
                        }}
                        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm transition-colors"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

// Função auxiliar para formatar duração
function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

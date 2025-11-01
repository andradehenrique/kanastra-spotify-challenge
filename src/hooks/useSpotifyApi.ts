import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  searchArtists,
  getArtistById,
  getArtistTopTracks,
  getArtistAlbums,
  type SpotifyArtist,
  type SpotifyTrack,
  type SpotifyPagingObject,
  type SpotifyAlbumSimplified,
} from '@/api';

/**
 * Hook para buscar artistas
 * @param query - Termo de busca
 * @param limit - Número de resultados (padrão: 20)
 * @param offset - Offset para paginação (padrão: 0)
 * @param enabled - Habilita ou desabilita a query
 * @return Lista paginada de artistas
 */
export const useSearchArtists = (
  query: string,
  limit: number = 20,
  offset: number = 0,
  enabled: boolean = true
): UseQueryResult<SpotifyPagingObject<SpotifyArtist>> => {
  return useQuery({
    queryKey: ['artists', 'search', query, limit, offset],
    queryFn: () => searchArtists(query, limit, offset),
    enabled: enabled && query.length > 0,
  });
};

/**
 * Hook para obter detalhes de um artista
 * @param artistId - ID do artista
 * @param enabled - Habilita ou desabilita a query
 * @return Informações do artista
 */
export const useArtistDetails = (
  artistId: string,
  enabled: boolean = true
): UseQueryResult<SpotifyArtist> => {
  return useQuery({
    queryKey: ['artists', artistId],
    queryFn: () => getArtistById(artistId),
    enabled: enabled && !!artistId,
  });
};

/**
 * Hook para obter top tracks de um artista
 * @param artistId - ID do artista
 * @param enabled - Habilita ou desabilita a query
 * @return Lista de top tracks do artista
 */
export const useArtistTopTracks = (
  artistId: string,
  enabled: boolean = true
): UseQueryResult<SpotifyTrack[]> => {
  return useQuery({
    queryKey: ['artists', artistId, 'top-tracks'],
    queryFn: () => getArtistTopTracks(artistId),
    enabled: enabled && !!artistId,
  });
};

/**
 * Hook para obter álbuns de um artista
 * @param artistId - ID do artista
 * @param limit - Número de resultados (padrão: 20)
 * @param offset - Offset para paginação (padrão: 0)
 * @param enabled - Habilita ou desabilita a query
 * @return Lista de álbuns do artista
 */
export const useArtistAlbums = (
  artistId: string,
  limit: number = 20,
  offset: number = 0,
  enabled: boolean = true
): UseQueryResult<SpotifyPagingObject<SpotifyAlbumSimplified>> => {
  return useQuery({
    queryKey: ['artists', artistId, 'albums', limit, offset],
    queryFn: () => getArtistAlbums(artistId, { limit, offset }),
    enabled: enabled && !!artistId,
  });
};

import { spotifyApi } from './axios';
import type {
  SpotifyArtist,
  SpotifySearchArtistsResponse,
  SpotifySearchAlbumsResponse,
  SpotifySearchParams,
  SpotifyPaginationParams,
  SpotifyPagingObject,
  SpotifyAlbumSimplified,
  SpotifyTrack,
} from '../@types/spotify';

/**
 * Busca artistas por nome
 * @param query - Termo de busca
 * @param limit - Número de resultados (padrão: 20)
 * @param offset - Offset para paginação (padrão: 0)
 * @returns Lista paginada de artistas
 */
export const searchArtists = async (
  query: string,
  limit: number = 20,
  offset: number = 0
): Promise<SpotifyPagingObject<SpotifyArtist>> => {
  const params: SpotifySearchParams = {
    q: query,
    type: 'artist',
    limit,
    offset,
  };

  const response = await spotifyApi.get<SpotifySearchArtistsResponse>('/search', {
    params,
  });

  return response.data.artists;
};

/**
 * Busca álbuns por nome
 * @param query - Termo de busca
 * @param limit - Número de resultados (padrão: 20)
 * @param offset - Offset para paginação (padrão: 0)
 * @returns Lista paginada de álbuns
 */
export const searchAlbums = async (
  query: string,
  limit: number = 20,
  offset: number = 0
): Promise<SpotifyPagingObject<SpotifyAlbumSimplified>> => {
  const params: SpotifySearchParams = {
    q: query,
    type: 'album',
    limit,
    offset,
  };

  const response = await spotifyApi.get<SpotifySearchAlbumsResponse>('/search', {
    params,
  });

  return response.data.albums;
};

/**
 * Obtém detalhes de um artista específico
 * @param artistId - ID do artista no Spotify
 * @returns Informações completas do artista
 */
export const getArtistById = async (artistId: string): Promise<SpotifyArtist> => {
  const response = await spotifyApi.get<SpotifyArtist>(`/artists/${artistId}`);
  return response.data;
};

/**
 * Obtém as top tracks de um artista
 * @param artistId - ID do artista no Spotify
 * @param market - Código do país (padrão: 'BR')
 * @returns Lista das músicas mais populares do artista
 */
export const getArtistTopTracks = async (
  artistId: string,
  market: string = 'BR'
): Promise<SpotifyTrack[]> => {
  const response = await spotifyApi.get<{ tracks: SpotifyTrack[] }>(
    `/artists/${artistId}/top-tracks`,
    {
      params: { market },
    }
  );

  return response.data.tracks;
};

/**
 * Obtém os álbuns de um artista
 * @param artistId - ID do artista no Spotify
 * @param params - Parâmetros de paginação
 * @returns Lista paginada de álbuns do artista
 */
export const getArtistAlbums = async (
  artistId: string,
  params?: SpotifyPaginationParams
): Promise<SpotifyPagingObject<SpotifyAlbumSimplified>> => {
  const response = await spotifyApi.get<SpotifyPagingObject<SpotifyAlbumSimplified>>(
    `/artists/${artistId}/albums`,
    {
      params: {
        limit: params?.limit || 20,
        offset: params?.offset || 0,
        market: params?.market || 'BR',
        include_groups: 'album,single',
      },
    }
  );

  return response.data;
};

/**
 * Obtém artistas relacionados
 * @param artistId - ID do artista no Spotify
 * @returns Lista de artistas relacionados
 */
export const getRelatedArtists = async (artistId: string): Promise<SpotifyArtist[]> => {
  const response = await spotifyApi.get<{ artists: SpotifyArtist[] }>(
    `/artists/${artistId}/related-artists`
  );

  return response.data.artists;
};

/**
 * Obtém detalhes de um álbum específico
 * @param albumId - ID do álbum no Spotify
 * @returns Informações completas do álbum
 */
export const getAlbumById = async (
  albumId: string,
  market: string = 'BR'
): Promise<SpotifyAlbumSimplified> => {
  const response = await spotifyApi.get<SpotifyAlbumSimplified>(`/albums/${albumId}`, {
    params: { market },
  });

  return response.data;
};

/**
 * Obtém as tracks de um álbum
 * @param albumId - ID do álbum no Spotify
 * @param params - Parâmetros de paginação
 * @returns Lista paginada de tracks do álbum
 */
export const getAlbumTracks = async (
  albumId: string,
  params?: SpotifyPaginationParams
): Promise<SpotifyPagingObject<SpotifyTrack>> => {
  const response = await spotifyApi.get<SpotifyPagingObject<SpotifyTrack>>(
    `/albums/${albumId}/tracks`,
    {
      params: {
        limit: params?.limit || 20,
        offset: params?.offset || 0,
        market: params?.market || 'BR',
      },
    }
  );

  return response.data;
};

/**
 * Busca múltiplos artistas por IDs
 * @param ids - Array de IDs de artistas (máximo 50)
 * @returns Lista de artistas
 */
export const getMultipleArtists = async (ids: string[]): Promise<SpotifyArtist[]> => {
  if (ids.length > 50) {
    throw new Error('Máximo de 50 artistas por requisição');
  }

  const response = await spotifyApi.get<{ artists: SpotifyArtist[] }>('/artists', {
    params: {
      ids: ids.join(','),
    },
  });

  return response.data.artists;
};

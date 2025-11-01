/**
 * Tipos TypeScript para a API do Spotify
 * Baseado na documentação oficial: https://developer.spotify.com/documentation/web-api
 */

/**
 * Imagem de um recurso do Spotify (artista, álbum, etc.)
 */
export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

/**
 * Link externo do Spotify
 */
export interface SpotifyExternalUrls {
  spotify: string;
}

/**
 * Informações de seguidores
 */
export interface SpotifyFollowers {
  href: string | null;
  total: number;
}

/**
 * Informações simplificadas de um artista
 */
export interface SpotifyArtistSimplified {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

/**
 * Informações completas de um artista
 */
export interface SpotifyArtist extends SpotifyArtistSimplified {
  followers: SpotifyFollowers;
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
}

/**
 * Informações simplificadas de um álbum
 */
export interface SpotifyAlbumSimplified {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  type: 'album';
  uri: string;
  artists: SpotifyArtistSimplified[];
}

/**
 * Informações completas de um álbum
 */
export interface SpotifyAlbum extends SpotifyAlbumSimplified {
  tracks: SpotifyPagingObject<SpotifyTrackSimplified>;
  copyrights: Array<{
    text: string;
    type: 'C' | 'P';
  }>;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  genres: string[];
  label: string;
  popularity: number;
}

/**
 * Informações simplificadas de uma track
 */
export interface SpotifyTrackSimplified {
  artists: SpotifyArtistSimplified[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  name: string;
  preview_url: string | null;
  track_number: number;
  type: 'track';
  uri: string;
}

/**
 * Informações completas de uma track
 */
export interface SpotifyTrack extends SpotifyTrackSimplified {
  album: SpotifyAlbumSimplified;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  popularity: number;
}

/**
 * Objeto de paginação do Spotify
 */
export interface SpotifyPagingObject<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

/**
 * Resposta de busca de artistas
 */
export interface SpotifySearchArtistsResponse {
  artists: SpotifyPagingObject<SpotifyArtist>;
}

/**
 * Resposta de busca de álbuns
 */
export interface SpotifySearchAlbumsResponse {
  albums: SpotifyPagingObject<SpotifyAlbumSimplified>;
}

/**
 * Parâmetros de busca
 */
export interface SpotifySearchParams {
  q: string;
  type: 'artist' | 'album' | 'track' | 'playlist';
  limit?: number;
  offset?: number;
  market?: string;
}

/**
 * Parâmetros de paginação
 */
export interface SpotifyPaginationParams {
  limit?: number;
  offset?: number;
  market?: string;
}

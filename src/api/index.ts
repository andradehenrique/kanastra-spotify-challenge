/**
 * API do Spotify - Exports centralizados
 *
 * Importação facilitada:
 * import { searchArtists, getArtistById } from '@/api';
 */

// Instância do Axios configurada
export { default as spotifyApi } from './axios';

// Configurações
export { SPOTIFY_CONFIG, validateSpotifyCredentials } from './config';

// Funções da API
export {
  searchArtists,
  getArtistById,
  getArtistTopTracks,
  getArtistAlbums,
  getRelatedArtists,
  getAlbumById,
  getAlbumTracks,
  getMultipleArtists,
} from './spotify';

// Tipos (re-export para conveniência)
export type {
  SpotifyArtist,
  SpotifyArtistSimplified,
  SpotifyAlbum,
  SpotifyAlbumSimplified,
  SpotifyTrack,
  SpotifyTrackSimplified,
  SpotifyImage,
  SpotifyPagingObject,
  SpotifySearchParams,
  SpotifyPaginationParams,
} from '../@types/spotify';

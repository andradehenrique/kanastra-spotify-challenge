/**
 * Configuração da API do Spotify
 *
 * Este módulo exporta as configurações necessárias para a API do Spotify
 */

export const SPOTIFY_CONFIG = {
  BASE_URL: 'https://api.spotify.com/v1',
  ACCOUNTS_URL: 'https://accounts.spotify.com/api/token',
  DEFAULT_MARKET: 'BR',
  DEFAULT_LIMIT: 20,
} as const;

/**
 * Valida se as credenciais do Spotify estão configuradas
 */
export const validateSpotifyCredentials = (): boolean => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error(
      'Credenciais do Spotify não configuradas. Crie um arquivo .env com VITE_SPOTIFY_CLIENT_ID e VITE_SPOTIFY_CLIENT_SECRET'
    );
    return false;
  }

  return true;
};

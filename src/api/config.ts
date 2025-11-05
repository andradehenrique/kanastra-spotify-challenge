export const SPOTIFY_CONFIG = {
  BASE_URL: 'https://api.spotify.com/v1',
  ACCOUNTS_URL: 'https://accounts.spotify.com/api/token',
  DEFAULT_MARKET: 'BR',
  DEFAULT_LIMIT: 20,
} as const;

/**
 * Credenciais do Spotify (obtidas das variáveis de ambiente)
 */
export const SPOTIFY_CREDENTIALS = {
  CLIENT_ID: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  CLIENT_SECRET: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '',
} as const;

/**
 * Valida se as credenciais do Spotify foram configuradas
 */
export const validateSpotifyCredentials = (): boolean => {
  if (!SPOTIFY_CREDENTIALS.CLIENT_ID || !SPOTIFY_CREDENTIALS.CLIENT_SECRET) {
    console.error(
      'Credenciais do Spotify não configuradas. Crie um arquivo .env com VITE_SPOTIFY_CLIENT_ID e VITE_SPOTIFY_CLIENT_SECRET'
    );
    return false;
  }

  return true;
};

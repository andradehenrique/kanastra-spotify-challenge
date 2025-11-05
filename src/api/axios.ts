import axios, { AxiosError, type AxiosInstance } from 'axios';
import { SPOTIFY_CONFIG, SPOTIFY_CREDENTIALS, validateSpotifyCredentials } from './config';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../lib/utils';
import { STORAGE_KEYS } from '../lib/constants';

interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

const getStoredToken = (): SpotifyToken | null => {
  const token = loadFromStorage<SpotifyToken | null>(STORAGE_KEYS.SPOTIFY_TOKEN, null);

  if (!token) return null;

  if (token.expires_at > Date.now()) {
    return token;
  }

  removeFromStorage(STORAGE_KEYS.SPOTIFY_TOKEN);
  return null;
};

const storeToken = (token: SpotifyToken): void => {
  saveToStorage(STORAGE_KEYS.SPOTIFY_TOKEN, token);
};

const clearStoredToken = (): void => {
  removeFromStorage(STORAGE_KEYS.SPOTIFY_TOKEN);
};

/**
 * Obtém um novo token de acesso do Spotify usando Client Credentials Flow
 */
const getAccessToken = async (): Promise<string> => {
  const storedToken = getStoredToken();
  if (storedToken) {
    return storedToken.access_token;
  }

  if (!validateSpotifyCredentials()) {
    throw new Error(
      'Credenciais do Spotify não configuradas. Configure VITE_SPOTIFY_CLIENT_ID e VITE_SPOTIFY_CLIENT_SECRET no arquivo .env'
    );
  }

  try {
    const credentials = btoa(
      `${SPOTIFY_CREDENTIALS.CLIENT_ID}:${SPOTIFY_CREDENTIALS.CLIENT_SECRET}`
    );

    const response = await axios.post<SpotifyToken>(
      SPOTIFY_CONFIG.ACCOUNTS_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    // Armazena o token com tempo de expiração (margem de 1 minuto)
    const token: SpotifyToken = {
      ...response.data,
      expires_at: Date.now() + response.data.expires_in * 1000 - 60000,
    };

    storeToken(token);

    return token.access_token;
  } catch (error) {
    console.error('Erro ao obter token de acesso do Spotify:', error);
    throw new Error('Falha na autenticação com a API do Spotify');
  }
};

export const spotifyApi: AxiosInstance = axios.create({
  baseURL: SPOTIFY_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

spotifyApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

spotifyApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as { error?: { message?: string } };

      switch (status) {
        case 401:
          clearStoredToken();

          // Tenta fazer a requisição novamente com um novo token
          if (error.config) {
            try {
              const token = await getAccessToken();
              error.config.headers.Authorization = `Bearer ${token}`;
              return spotifyApi.request(error.config);
            } catch (retryError) {
              return Promise.reject(retryError);
            }
          }
          break;

        case 403:
          console.error('Acesso negado pela API do Spotify');
          break;

        case 404:
          console.error('Recurso não encontrado');
          break;

        case 429: {
          const retryAfter = error.response.headers['retry-after'];
          console.error(`Rate limit excedido. Tente novamente após ${retryAfter} segundos`);
          break;
        }

        case 500:
        case 502:
        case 503:
          console.error('Erro no servidor do Spotify');
          break;

        default:
          console.error('Erro na requisição:', data?.error?.message || error.message);
      }
    } else if (error.request) {
      console.error('Sem resposta do servidor:', error.message);
    } else {
      console.error('Erro na configuração da requisição:', error.message);
    }

    return Promise.reject(error);
  }
);

export default spotifyApi;

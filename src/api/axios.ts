import axios, { AxiosError, type AxiosInstance } from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/api/token';

// Configuração de credenciais (em produção, use variáveis de ambiente)
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';

/**
 * Interface para armazenar o token de acesso
 */
interface SpotifyToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
}

let spotifyToken: SpotifyToken | null = null;

/**
 * Obtém um novo token de acesso do Spotify usando Client Credentials Flow
 */
const getAccessToken = async (): Promise<string> => {
  // Se já temos um token válido, retorna-o
  if (spotifyToken && spotifyToken.expires_at > Date.now()) {
    return spotifyToken.access_token;
  }

  try {
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const response = await axios.post<SpotifyToken>(
      SPOTIFY_ACCOUNTS_URL,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    // Armazena o token com tempo de expiração
    spotifyToken = {
      ...response.data,
      expires_at: Date.now() + response.data.expires_in * 1000 - 60000, // 1 minuto de margem
    };

    return spotifyToken.access_token;
  } catch (error) {
    console.error('Erro ao obter token de acesso do Spotify:', error);
    throw new Error('Falha na autenticação com a API do Spotify');
  }
};

/**
 * Instância configurada do Axios para a API do Spotify
 */
export const spotifyApi: AxiosInstance = axios.create({
  baseURL: SPOTIFY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de Request: Adiciona o token de autenticação
 */
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

/**
 * Interceptor de Response: Tratamento de erros
 */
spotifyApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      // O servidor respondeu com um status code fora do range 2xx
      const status = error.response.status;
      const data = error.response.data as { error?: { message?: string } };

      switch (status) {
        case 401:
          // Token expirado ou inválido - limpa o token e tenta novamente
          spotifyToken = null;

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
          // Rate limit exceeded
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
      // A requisição foi feita mas não houve resposta
      console.error('Sem resposta do servidor:', error.message);
    } else {
      // Algo aconteceu na configuração da requisição
      console.error('Erro na configuração da requisição:', error.message);
    }

    return Promise.reject(error);
  }
);

export default spotifyApi;

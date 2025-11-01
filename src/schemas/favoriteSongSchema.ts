import { z } from 'zod';

export const favoriteSongSchema = z.object({
  id: z.string().uuid().optional(), // Gerado automaticamente
  songName: z
    .string()
    .min(2, 'favorites.validation.songNameMin')
    .max(100, 'Nome da música não pode ter mais de 100 caracteres'),
  artistName: z
    .string()
    .min(2, 'favorites.validation.artistNameMin')
    .max(100, 'Nome do artista não pode ter mais de 100 caracteres'),
  albumName: z
    .string()
    .min(2, 'favorites.validation.albumNameMin')
    .max(100, 'Nome do álbum não pode ter mais de 100 caracteres')
    .optional()
    .or(z.literal('')),
  notes: z
    .string()
    .max(500, 'favorites.validation.notesMax')
    .optional()
    .or(z.literal('')),
  createdAt: z.string().datetime().optional(), // ISO timestamp
  spotifyTrackId: z.string().optional(), // ID da track no Spotify (se vier da API)
  spotifyArtistId: z.string().optional(), // ID do artista no Spotify (se vier da API)
  imageUrl: z.string().url().optional().or(z.literal('')),
});

/**
 * Tipo inferido do schema para uso no TypeScript
 */
export type FavoriteSong = z.infer<typeof favoriteSongSchema>;

/**
 * Tipo para o formulário (sem campos gerados automaticamente)
 */
export type FavoriteSongFormData = Omit<FavoriteSong, 'id' | 'createdAt'>;

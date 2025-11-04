import { z } from 'zod';

export const favoriteSongSchema = z.object({
  songName: z.string().min(1, 'Song name is required'),
  artistName: z.string().min(1, 'Artist name is required'),
  albumName: z.string().optional().or(z.literal('')),
  spotifyTrackId: z.string().optional(),
  spotifyArtistId: z.string().optional(),
  imageUrl: z.string().optional().or(z.literal('')),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional().or(z.literal('')),
});

export type FavoriteSongFormData = z.infer<typeof favoriteSongSchema>;

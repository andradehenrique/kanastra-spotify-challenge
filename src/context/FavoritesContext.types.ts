export interface FavoriteSong {
  id: string;
  songName: string;
  artistName: string;
  albumName?: string;
  notes?: string;
  createdAt: string;
  spotifyTrackId?: string;
  spotifyArtistId?: string;
  imageUrl?: string;
}

export interface FavoritesState {
  songs: FavoriteSong[];
}

export type FavoritesAction =
  | { type: 'ADD_SONG'; payload: FavoriteSong }
  | { type: 'REMOVE_SONG'; payload: string }
  | { type: 'CLEAR_ALL' };

export interface FavoritesContextType {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
  addSong: (song: Omit<FavoriteSong, 'id' | 'createdAt'>) => void;
  removeSong: (id: string) => void;
  clearAll: () => void;
  isFavorite: (spotifyTrackId: string) => boolean;
  getFavoriteByTrackId: (spotifyTrackId: string) => FavoriteSong | undefined;
}

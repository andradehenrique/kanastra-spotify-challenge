export interface FavoriteSong {
  id: string;
  name: string;
  artist: string;
  album?: string;
  addedAt: string;
}

export interface FavoritesState {
  songs: FavoriteSong[];
}

export type FavoritesAction =
  | { type: 'ADD_SONG'; payload: FavoriteSong }
  | { type: 'REMOVE_SONG'; payload: string }
  | { type: 'LOAD_SONGS'; payload: FavoriteSong[] }
  | { type: 'CLEAR_ALL' };

export interface FavoritesContextType {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
  addSong: (song: Omit<FavoriteSong, 'id' | 'addedAt'>) => void;
  removeSong: (id: string) => void;
  clearAll: () => void;
}

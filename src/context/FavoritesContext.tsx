import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { FavoritesContext } from './favoritesContext';
import type {
  FavoriteSong,
  FavoritesState,
  FavoritesAction,
  FavoritesContextType,
} from './FavoritesContext.types';

const STORAGE_KEY = 'spotify-favorites';

function loadFromStorage(): FavoriteSong[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as FavoriteSong[];
    }
  } catch (error) {
    console.error('Erro ao carregar favoritos do Local Storage:', error);
  }
  return [];
}

function saveToStorage(songs: FavoriteSong[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
  } catch (error) {
    console.error('Erro ao salvar favoritos no Local Storage:', error);
  }
}

const initialState: FavoritesState = {
  songs: loadFromStorage(),
};

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_SONG':
      return {
        ...state,
        songs: [...state.songs, action.payload],
      };
    case 'REMOVE_SONG':
      return {
        ...state,
        songs: state.songs.filter((song) => song.id !== action.payload),
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        songs: [],
      };
    default:
      return state;
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addSong = (song: Omit<FavoriteSong, 'id' | 'createdAt'>) => {
    const newSong: FavoriteSong = {
      ...song,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_SONG', payload: newSong });

    const updatedSongs = [...state.songs, newSong];
    saveToStorage(updatedSongs);
  };

  const removeSong = (id: string) => {
    dispatch({ type: 'REMOVE_SONG', payload: id });

    const updatedSongs = state.songs.filter((song) => song.id !== id);
    saveToStorage(updatedSongs);
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
    saveToStorage([]);
  };

  const isFavorite = (spotifyTrackId: string): boolean => {
    if (!spotifyTrackId) return false;
    return state.songs.some((song) => song.spotifyTrackId === spotifyTrackId);
  };

  const getFavoriteByTrackId = (spotifyTrackId: string): FavoriteSong | undefined => {
    if (!spotifyTrackId) return undefined;
    return state.songs.find((song) => song.spotifyTrackId === spotifyTrackId);
  };

  const value: FavoritesContextType = {
    state,
    dispatch,
    addSong,
    removeSong,
    clearAll,
    isFavorite,
    getFavoriteByTrackId,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

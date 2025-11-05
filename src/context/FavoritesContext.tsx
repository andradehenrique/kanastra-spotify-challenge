import { useReducer } from 'react';
import type { ReactNode } from 'react';
import { FavoritesContext } from './favoritesContext';
import { loadFromStorage, saveToStorage, generateUniqueId } from '@/lib/utils';
import { STORAGE_KEYS } from '@/lib/constants';
import type {
  FavoriteSong,
  FavoritesState,
  FavoritesAction,
  FavoritesContextType,
} from './FavoritesContext.types';

const initialState: FavoritesState = {
  songs: loadFromStorage<FavoriteSong[]>(STORAGE_KEYS.FAVORITES, []),
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
      id: generateUniqueId(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_SONG', payload: newSong });

    const updatedSongs = [...state.songs, newSong];
    saveToStorage(STORAGE_KEYS.FAVORITES, updatedSongs);
  };

  const removeSong = (id: string) => {
    dispatch({ type: 'REMOVE_SONG', payload: id });

    const updatedSongs = state.songs.filter((song) => song.id !== id);
    saveToStorage(STORAGE_KEYS.FAVORITES, updatedSongs);
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
    saveToStorage(STORAGE_KEYS.FAVORITES, []);
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

import { useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import { FavoritesContext } from './favoritesContext';
import type {
  FavoriteSong,
  FavoritesState,
  FavoritesAction,
  FavoritesContextType,
} from './FavoritesContext.types';

const STORAGE_KEY = 'spotify-favorites';

const initialState: FavoritesState = {
  songs: [],
};

// Reducer
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
    case 'LOAD_SONGS':
      return {
        ...state,
        songs: action.payload,
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

// Provider
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Carregar do Local Storage na montagem
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const songs = JSON.parse(stored) as FavoriteSong[];
        dispatch({ type: 'LOAD_SONGS', payload: songs });
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do Local Storage:', error);
    }
  }, []);

  // Salvar no Local Storage sempre que o estado mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.songs));
    } catch (error) {
      console.error('Erro ao salvar favoritos no Local Storage:', error);
    }
  }, [state.songs]);

  // Helper functions
  const addSong = (song: Omit<FavoriteSong, 'id' | 'addedAt'>) => {
    const newSong: FavoriteSong = {
      ...song,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      addedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_SONG', payload: newSong });
  };

  const removeSong = (id: string) => {
    dispatch({ type: 'REMOVE_SONG', payload: id });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const value: FavoritesContextType = {
    state,
    dispatch,
    addSong,
    removeSong,
    clearAll,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

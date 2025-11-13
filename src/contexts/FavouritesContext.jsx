import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load favourites from localStorage when user changes
    if (user) {
      const storedFavourites = localStorage.getItem(`favourites_${user.email}`);
      if (storedFavourites) {
        setFavourites(JSON.parse(storedFavourites));
      } else {
        setFavourites([]);
      }
    } else {
      setFavourites([]);
    }
  }, [user]);

  const addToFavourites = (product) => {
    if (!user) return;

    const newFavourites = [...favourites, product];
    setFavourites(newFavourites);
    localStorage.setItem(`favourites_${user.email}`, JSON.stringify(newFavourites));
  };

  const removeFromFavourites = (productId) => {
    if (!user) return;

    const newFavourites = favourites.filter(item => item.id !== productId);
    setFavourites(newFavourites);
    localStorage.setItem(`favourites_${user.email}`, JSON.stringify(newFavourites));
  };

  const isFavourite = (productId) => {
    return favourites.some(item => item.id === productId);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

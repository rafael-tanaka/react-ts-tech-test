import { useState, useEffect } from "react";

const FAVORITES_KEY = "favoriteRecords";

export const useFavoritesManager = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  return { favorites, toggleFavorite };
};

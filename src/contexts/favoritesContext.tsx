import React, { createContext, useContext } from "react";
import { useFavoritesManager } from "../hooks/useFavoritesManager";

type FavoritesContextType = ReturnType<typeof useFavoritesManager>;

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const favoritesManager = useFavoritesManager();

  return (
    <FavoritesContext.Provider value={favoritesManager}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavoritesContext must be used within a FavoritesProvider");
  }
  return context;
};

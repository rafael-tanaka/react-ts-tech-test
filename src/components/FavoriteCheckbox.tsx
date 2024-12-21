import React from "react";
import { useFavoritesContext } from "../contexts/favoritesContext";

type FavoriteCheckboxProps = {
  id: number;
  label?: string;
  favorites?: number[];
  toggleFavorite?: (id: number) => void;
};

const FavoriteCheckbox: React.FC<FavoriteCheckboxProps> = ({
  id,
  label = "Favorite",
  favorites,
  toggleFavorite,
}) => {
  const context = useFavoritesContext();
  const isFavorited = (favorites || context.favorites).includes(id);
  const toggle = toggleFavorite || context.toggleFavorite;

  return (
    <label>
      <input
        type="checkbox"
        checked={isFavorited}
        onChange={() => toggle(id)}
      />
      {label}
    </label>
  );
};

export default FavoriteCheckbox;

import React from "react";
import { useFavoritesContext } from "../contexts/favoritesContext";

type ToggleFavoriteButtonProps = {
  id: number;
  favoritedLabel?: string;
  notFavoritedLabel?: string;
  favorites?: number[];
  toggleFavorite?: (id: number) => void;
};

const ToggleFavoriteButton: React.FC<ToggleFavoriteButtonProps> = ({
  id,
  favoritedLabel = "Unfavorite",
  notFavoritedLabel = "Favorite",
  favorites,
  toggleFavorite,
}) => {
  const context = useFavoritesContext();
  const isFavorited = (favorites || context.favorites).includes(id);
  const toggle = toggleFavorite || context.toggleFavorite;

  return (
    <button data-test={`toggle-favorite-btn-${id}`} onClick={() => toggle(id)}>
      {isFavorited ? favoritedLabel : notFavoritedLabel}
    </button>
  );
};

export default ToggleFavoriteButton;

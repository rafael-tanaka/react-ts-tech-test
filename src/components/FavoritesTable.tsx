import React from "react";
import { useFavoritesContext } from "../contexts/favoritesContext";
import AddToFavoriteButton from "./AddToFavoriteButton";

const FavoritesTable: React.FC = () => {
  const { favorites } = useFavoritesContext(); // Lê os IDs favoritos do contexto

  return (
    <div
      data-test="favorites-table"
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#ccc",
        padding: "10px",
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      <h3>Favorites</h3>
      {favorites.length === 0 ? (
        <p>No favorites selected</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #999" }}>ID</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((id) => (
              <tr data-test={`favorite-establishment-${id}`} key={id}>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>{id}</td>
                <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}><AddToFavoriteButton id={id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavoritesTable;

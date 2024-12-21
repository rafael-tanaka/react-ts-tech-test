import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EstablishmentDetailPage from "./pages/EstablishmentDetailPage";
import NotFoundPage from "./pages/NotFound";
import { FavoritesProvider } from "./contexts/favoritesContext";
import FavoritesTable from "./components/FavoritesTable";

const AppRoutes: React.FC = () => {
  return (
    <FavoritesProvider>
      <Router>
        <FavoritesTable />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/establishments/:id" element={<EstablishmentDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
};

export default AppRoutes;

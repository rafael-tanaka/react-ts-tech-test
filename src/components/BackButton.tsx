import React from "react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to: string; 
  onBack?: () => void; 
}

const BackButton: React.FC<BackButtonProps> = ({ to, onBack }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBack) {
      onBack();
    }
    navigate(to);
  };

  return (
    <button onClick={handleClick} style={{ padding: "10px 20px", cursor: "pointer" }} data-test="back-button">
      Back
    </button>
  );
};

export default BackButton;

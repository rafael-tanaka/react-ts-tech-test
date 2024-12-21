import React from "react";
import { AuthorityType } from "../api/ratingsAPI";

interface AuthorityDropdownProps {
  selectedAuthority: AuthorityType | null;
  authorities: AuthorityType[];
  isLoading: boolean;
  onSelect: (selectedAuthority: AuthorityType | null) => void;
  disabled?: boolean;
  error?: any; // Indica erro, pode ser um objeto ou string
}

export const AuthorityDropdown: React.FC<AuthorityDropdownProps> = ({
  selectedAuthority,
  authorities,
  isLoading,
  onSelect,
  disabled,
  error,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedAuthority = authorities.find(
      (authority) => authority.LocalAuthorityId.toString() === selectedId
    );
    onSelect(selectedAuthority || null);
  };

  return (
    <div>
      <select
        onChange={handleChange}
        value={selectedAuthority ? selectedAuthority.LocalAuthorityId.toString() : ""}
        disabled={disabled || isLoading || !!error}
        data-test="authority-dropdown"
      >
        {isLoading ? (
          <option data-test="loading-authority-dropdown" value="" disabled>
            Loading...
          </option>
        ) : error ? (
          <option data-test="error-authority-dropdown" value="" disabled>
            Error loading authorities
          </option>
        ) : (
          <>
            <option value="" disabled>
              Select an authority
            </option>
            <option value="ALL">All</option>
            {authorities?.map((authority) => (
              <option key={authority.LocalAuthorityId} value={authority.LocalAuthorityId}>
                {authority.Name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

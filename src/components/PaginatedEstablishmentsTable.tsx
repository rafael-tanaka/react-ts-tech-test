import { useState, useEffect } from "react";
import { EstablishmentsTable } from "./EstablishmentsTable";
import { EstablishmentsTableNavigation } from "./EstablishmentsTableNavigation";
import { AuthorityType, EstablishmentType, getAuthorities, getEstablishmentRatings, getEstablishmentsByAuthority } from "../api/ratingsAPI";
import { AuthorityDropdown } from "./AuthorityDropdown";

const tableStyle = {
  background: "#82C7AF",
  padding: "10px",
  width: "max-content",
  marginLeft: "50px",
  color: "white",
};

export const PaginatedEstablishmentsTable = () => {
  const [estabError, setEstabError] = useState<{ message: string; [key: string]: string }>();
  const [authorityError, setAuthorityError] = useState<{ message: string; [key: string]: string }>();
  const [establishments, setEstablishments] = useState<EstablishmentType[]>([]);
  const [authorities, setAuthorities] = useState<AuthorityType[]>([]);
  const [selectedAuthority, setSelectedAuthority] = useState<AuthorityType | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(100);
  const [isEstabLoading, setIsEstabLoading] = useState(false);
  const [isAuthorityLoading, setIsAuthorityLoading] = useState(false);

  useEffect(() => {
    fetchEstablishments();
    fetchAuthorities();
  }, [pageNum, selectedAuthority]);
  
  const fetchEstablishments = async () => {
    setIsEstabLoading(true);

    try {
      const ratings = selectedAuthority
        ? await getEstablishmentsByAuthority(pageNum, selectedAuthority!.LocalAuthorityId)
        : await getEstablishmentRatings(pageNum);

      setEstablishments(ratings.establishments);
      setPageCount(ratings.meta.totalPages);
    } catch (e: any) {
      setEstabError(e);
    } finally {
      setIsEstabLoading(false);
    }
  };

  const fetchAuthorities = async () => {
    setIsAuthorityLoading(true);

    try {
      if (!authorities?.length) {
        const authorityData = await getAuthorities(pageNum);
        setAuthorities(authorityData.authorities);
      }
    } catch (e: any) {
      setAuthorityError(e);
    } finally {
      setIsAuthorityLoading(false);
    }
  };

  async function handlePreviousPage() {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  }

  async function handleNextPage() {
    if (pageNum < pageCount) {
      setPageNum(pageNum + 1);
    }
  }

  async function handleAuthorityFilter(authority: AuthorityType | null) {
    setSelectedAuthority(authority);
    setPageNum(1);
  }

  if (estabError) {
    return <div data-test="establishment-list-error">Error: {estabError.message}</div>;
  } else {
    return (
      <div style={tableStyle}>
        <h2>Food Hygiene Ratings</h2>
        Authority:
        <AuthorityDropdown
          selectedAuthority={selectedAuthority}
          authorities={authorities}
          isLoading={isAuthorityLoading}
          onSelect={handleAuthorityFilter}
          disabled={isEstabLoading || isAuthorityLoading || !!authorityError}
          error={authorityError}
        />
        <EstablishmentsTable establishments={establishments} isLoading={isEstabLoading} />
        <EstablishmentsTableNavigation
          pageNum={pageNum}
          pageCount={pageCount}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
          isLoading={isEstabLoading}
        />
      </div>
    );
  }
};

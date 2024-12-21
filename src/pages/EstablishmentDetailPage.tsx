import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEstablishmentDetail } from "../api/ratingsAPI";
import { EstablishmentDetails } from "../components/EstabilishmentDetails";

const EstablishmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        // Simulação de fetch de API
        const data = await getEstablishmentDetail(parseInt(id!))

        setDetails(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id]);

  if (isLoading) {
    return <div data-test="estab-details-loading">Loading...</div>;
  }

  if (error) {
    return <div data-test="estab-details-error">Error: {error}</div>;
  }

  return (
    <EstablishmentDetails establishment={details}/>
  );
};

export default EstablishmentDetailPage;

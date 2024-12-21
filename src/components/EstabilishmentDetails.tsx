import { EstablishmentType } from "../api/ratingsAPI";
import AddToFavoriteButton from "./AddToFavoriteButton";
import BackButton from "./BackButton";

const rowStyle: { [key: string]: string | number } = {
  fontSize: "20px",
};

export const EstablishmentDetails: React.FC<{
  establishment: EstablishmentType | null | undefined;
}> = ({ establishment }) => {
  return (
    <><BackButton to="/" /><div data-test="estab-details-data"><h1>{JSON.stringify(establishment)}</h1><AddToFavoriteButton id={establishment?.FHRSID!} /></div></>
  );
};

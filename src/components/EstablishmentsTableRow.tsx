import { Link } from "react-router-dom";
import { EstablishmentType } from "../api/ratingsAPI";
import FavoriteCheckbox from "./FavoriteCheckbox";

const rowStyle: { [key: string]: string | number } = {
  fontSize: "20px",
};

export const EstablishmentsTableRow: React.FC<{
  establishment: EstablishmentType | null | undefined;
}> = ({ establishment }) => {
  return (
    <tr data-test={`establishment-row-${establishment!.FHRSID}`}>
      <td><FavoriteCheckbox id={establishment!.FHRSID} /></td>
      <td style={rowStyle}><Link to={`establishments/${establishment?.FHRSID}`}>{establishment?.BusinessName}</Link></td>
      <td style={rowStyle}>{establishment?.RatingValue}</td>
    </tr>
  );
};

import React from "react";
import { EstablishmentsTableRow } from "./EstablishmentsTableRow";
import PropTypes from "prop-types";
import { EstablishmentType } from "../api/ratingsAPI";
import Loading from "./Loading";

const headerStyle: { [key: string]: string | number } = {
  paddingBottom: "10px",
  textAlign: "left",
  fontSize: "20px",
};

export const EstablishmentsTable: React.FC<{
  establishments: EstablishmentType[] | null | undefined, isLoading: boolean
}> = ({ establishments, isLoading }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th style={headerStyle}>Business Name</th>
          <th style={headerStyle}>Rating Value</th>
        </tr>
        { isLoading ? <Loading dataTestId={"loading-establishments"}/>: 
        establishments &&
          establishments?.map(
            (
              establishment: EstablishmentType,
              index: React.Key | null | undefined
            ) => (
              <EstablishmentsTableRow
                key={index}
                establishment={establishment}
              />
            )
          )}
      </tbody>
    </table>
  );
};

EstablishmentsTable.propTypes = {
  establishments: PropTypes.array,
};

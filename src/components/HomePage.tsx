import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";

const logoStyle: { [key: string]: string | number } = {
  width: "640px",
  height: "200px",
  background: `transparent url(${Background}) no-repeat center`,
  margin: "20px auto",
};

const HomePage = () => {
  return (
    <div>
      <header style={logoStyle} />
      <PaginatedEstablishmentsTable />
    </div>
  );
};

export default HomePage;

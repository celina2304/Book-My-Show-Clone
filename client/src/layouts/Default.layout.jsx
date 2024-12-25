import PropTypes from "prop-types";

// Components
import Navbar from "../components/Navbar/navbar.component";
import HeroCarousal from "../components/HeroCarousal/HeroCarousal.component";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <HeroCarousal />
      {children}
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node,
};

export default DefaultLayout;
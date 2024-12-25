import { Route } from "react-router-dom";
import PropTypes from "prop-types"; 

// Layout
import DefaultLayout from "../layouts/Default.layout";

interface DefaultHOCProps {
  element: React.ReactNode;
}

const DefaultHOC: React.FC<DefaultHOCProps> = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <DefaultLayout>
          {element}
        </DefaultLayout>
      }
    />
  );
};

DefaultHOC.propTypes = { // Add propTypes
  element: PropTypes.element.isRequired,
};

export default DefaultHOC;
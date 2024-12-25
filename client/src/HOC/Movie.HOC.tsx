import { Route } from "react-router-dom";
import PropTypes from "prop-types"; 

// Layout
import MovieLayout from "../layouts/Movie.layout";

interface MovieHOCProps {
  element: React.ReactNode;
} 

const MovieHOC: React.FC<MovieHOCProps> = ({ element, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        element={
          <MovieLayout>
            {element}
          </MovieLayout>
        }
      />
    </>
  );
};
MovieHOC.propTypes = { 
  element: PropTypes.element.isRequired,
};


export default MovieHOC;
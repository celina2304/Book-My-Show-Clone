import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "./movie.context";
import { useLocation } from "react-router-dom";

const MovieProvider = ({ children }) => {
  const location = useLocation();
  const [movie, setMovie] = useState({
    id: 0,
    original_title: "",
    overview: "",
    backdrop_path: "",
    poster_path: "",
    original_language: "",
    runtime: 0,
  });

  useEffect(() => {
    if (location.pathname === "/") {
      setMovie({
        id: 0,
        original_title: "",
        overview: "",
        backdrop_path: "",
        poster_path: "",
        original_language: "",
        runtime: 0,
      });
    }
  }, [location.pathname]);

  return (
    <MovieContext.Provider value={{ movie, setMovie }}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node,
};

export default MovieProvider;

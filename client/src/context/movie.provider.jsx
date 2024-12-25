import { useState } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "./movie.context";

const MovieProvider = ({ children }) => {
    const [movie, setMovie] = useState({
      id: 0,
      original_title: "",
      overview: "",
      backdrop_path: "",
      poster_path: "",
      original_language: "",
      runtime: 0,
    });
  
    return (
      <MovieContext.Provider value={{ movie, setMovie }}>
        {children}
      </MovieContext.Provider>
    );
  };
  
  MovieProvider.propTypes = {
    children: PropTypes.node
  };
  
  
  export default MovieProvider;
  
import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

// Components
// import MovieNavbar from "../components/Navbar/movieNavbar.component";

// context
import { MovieContext } from "../context/movie.context";
import { tmdbApi } from "../config/Axios.config";
import Navbar from "../components/Navbar/navbar.component";

const MovieLayout = (props) => {
  const { id } = useParams();
  const { movie, setMovie } = useContext(MovieContext);

  useEffect(() => {
    const requestMovie = async () => {
      const getMovieData = await tmdbApi.get(`/movie/${id}`);
      setMovie(getMovieData.data);
    };
    requestMovie();
  }, [id, setMovie]);

  if (movie) {
    //
  }

  return (
    <>
      {/* <MovieNavbar /> */}
      <Navbar />
      {props.children}
    </>
  );
};

MovieLayout.propTypes = {
  children: PropTypes.node,
};

export default MovieLayout;

import axios from "axios";
import  { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types"

// Components
import MovieNavbar from "../components/Navbar/movieNavbar.component";

// context
import { MovieContext } from "../context/movie.context";

const MovieLayout = (props) => {
  const { id } = useParams();
  const { movie, setMovie } = useContext(MovieContext);

  useEffect(() => {
    const requestMovie = async () => {
      const getMovieData = await axios.get(`/movie/${id}`);
      setMovie(getMovieData.data);
    };
    requestMovie();
  }, [id, setMovie]);
  
  if(movie){
    //
  }

  return (
    <>
      <MovieNavbar />
      {props.children}
    </>
  );
};

MovieLayout.propTypes = {
  children: PropTypes.node
}



export default MovieLayout;
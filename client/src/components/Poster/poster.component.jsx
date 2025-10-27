import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const Poster = (props) => {
  // <Link to={`/movie/${props.id}`}>
  // </Link>
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/movie/${props.id}`)}
      className="flex flex-col items-start gap-2 mx-1 md:mx-3 cursor-pointer"
    >
      <div className="w-full">
        <img
          src={`https://image.tmdb.org/t/p/original${props.poster_path}`}
          alt={props.original_title}
          className="w-full h-full rounded-md"
        />
      </div>
      <h3
        className={`text-lg font-bold ${
          props.isDark ? "text-white" : "text-gray-700"
        }`}
      >
        {props.original_title}
      </h3>
      <p className={`text-sm ${props.isDark ? "text-white" : "text-gray-700"}`}>
        {props.subtitle}
      </p>
    </div>
  );
};

Poster.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  original_title: PropTypes.string,
  subtitle: PropTypes.string,
  isDark: PropTypes.bool,
};

export default Poster;

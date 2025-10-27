import PropTypes from "prop-types";
const Cast = (props) => {
  return (
    <div>
      <div className="flex flex-col text-center items-center">
        <div
          className="w-32 h-32 rounded-full"
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "cover",
          }}
        ></div>
        <h1 className="text-gray-800">{props.castName}</h1>
        <h5 className="text-xs text-gray-500">as {props.role}</h5>
      </div>
    </div>
  );
};

Cast.propTypes = {
  image: PropTypes.string,
  castName: PropTypes.string,
  role: PropTypes.string,
};

export default Cast;

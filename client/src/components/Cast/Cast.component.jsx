import PropTypes from "prop-types";
const Cast = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-32 h-32">
          <img
            src={props.image}
            alt="crew man"
            className="w-full h-full rounded-full"
          />
        </div>
        <h1 className="text-xl  text-gray-800">{props.castName}</h1>
        <h5 className="text-sm text-gray-500">as {props.role}</h5>
      </div>
    </div>
  );
};

Cast.propTypes = {
  image: PropTypes.string,
  castName: PropTypes.string,
  role: PropTypes.string
}



export default Cast;
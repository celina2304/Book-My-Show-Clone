import Slider from "react-slick";
import PropTypes from "prop-types";
// components
import Poster from "../Poster/poster.component";

// Configs
import PosterCarouselSettings from "../../config/PosterCarousel.config";

const PosterSlider = (props) => {
  const sliderConfig = props.config ? props.config : PosterCarouselSettings;

  return (
    <>
      <div className="flex flex-col items-start my-2">
        <h3
          className={` text-2xl font-bold ${
            props.isDark ? "text-white" : "text-gray-800"
          }`}
        >
          {props.title}
        </h3>
        <p
          className={` text-sm ${
            props.isDark ? "text-white" : "text-gray-800"
          }`}
        >
          {props.subtitle}
        </p>
      </div>
      <Slider {...sliderConfig}>
        {props.images.map((image) => (
          <Poster
            {...image}
            isDark={props.isDark}
            key={`slider-poster-1${image.id}`}
          />
        ))}
      </Slider>
    </>
  );
};
PosterSlider.propTypes = {
  images: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isDark: PropTypes.bool,
  config: PropTypes.object,
};

export default PosterSlider;

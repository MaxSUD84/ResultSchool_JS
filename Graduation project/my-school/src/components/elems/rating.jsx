/* eslint-disable indent */
import PropTypes from "prop-types";

const Rating = ({ value }) => {
  const _value = isFinite(+value) ? (+value).toFixed(1) : 0;
  return (
    <>
      <span
        className={`
            text-lg font-semibold 
            ${
              _value > 4.5
                ? "text-emerald-700"
                : _value > 3.8
                ? "text-lime-500"
                : _value > 3.0
                ? "text-orange-300"
                : _value > 2.0
                ? "text-red-400"
                : "text-red-700"
            }
            `}
      >
        {/* {value?.toFixed(1)} */}
        {_value}
      </span>
    </>
  );
};

Rating.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Rating;

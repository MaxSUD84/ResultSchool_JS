/* eslint-disable multiline-ternary */
import PropTypes from "prop-types";
import style from "../../styles/styles";

// "offsetTernaryExpressions": true,
// "requireMultiLineTernary": true,

const LabelWithDescription = ({ title, label, children }) => {
  return (
    <div className="w-full">
      {title ? (
        <div>
          <p className={`${style.paragraph} mb-1 underline underline-offset-1`}>
            {title}:
          </p>
        </div>
      ) : (
        ""
      )}
      <div className={`${style.paragraph} flex flex-nowrap mb-2`}>
        <p className="whitespace-nowrap">{label}</p>:
        <span
          className="
            font-bold 
            mt-0
            block
            w-full
            py-0.5
            px-3
            border-0 border-b-2 border-gray-200
            focus:ring-0 focus:border-black"
        >
          {children}
        </span>
      </div>
    </div>
  );
};

LabelWithDescription.default = {
  title: "",
};

LabelWithDescription.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default LabelWithDescription;

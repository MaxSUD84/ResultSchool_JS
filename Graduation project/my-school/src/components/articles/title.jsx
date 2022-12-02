import PropTypes from "prop-types";
import style from "../../styles/styles";

const Title = ({ children, title_1, title_2 }) => {
  return (
    <div className="flex flex-row align-middle  items-center h-12 w-full bg-gradient-to-r from-primary-2 via-primary-300 to-transparent">
      {children || ""}
      {title_1 && (
        <h1 className={`${style.heading2} w-auto items-start text-orange-500`}>
          {title_1}
        </h1>
      )}
      {title_2 && (
        <h1
          className={`${style.heading2} w-auto items-start left-2 text-orange-500 `}
        >
          {title_2}
        </h1>
      )}
    </div>
  );
};

Title.default = {
  title_1: "",
  title_2: ""
};

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  title_1: PropTypes.oneOfType([PropTypes.string, null]),
  title_2: PropTypes.oneOfType([PropTypes.string, null])
};
export default Title;

/*
        <h1 className={`${style.heading2} items-start`}>Benefit list</h1>
        <div className="w-[150px]">
          <Logo width={150} height={(150 * 105) / 400} />
        </div>

              width={width}
      height={height}
      viewBox="0 0 400 105"
      className="school-title-logo"
*/

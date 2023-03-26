import PropTypes from "prop-types";
import style from "../../styles/styles";

const styles = [
  {
    twBgColor: "",
    twTitleColor_1: "text-slate-900",
    twTitleColor_2: "text-slate-700"
  },
  {
    twBgColor: "bg-gradient-to-r from-primary-2 via-primary-300 to-transparent",
    twTitleColor_1: "text-orange-500",
    twTitleColor_2: "text-orange-500"
  },
  {
    twBgColor: "bg-gradient-to-r from-orange-500 via-orange-200 to-transparent",
    twTitleColor_1: "text-primary-2",
    twTitleColor_2: "text-primary-300"
  }
];

const Title = ({ children, title_1, title_2, styleType }) => {
  return (
    <div
      className={`flex flex-row align-middle my-2 items-center h-12 w-full rounded ${
        styles[styleType || 0].twBgColor
      } px-1`}
    >
      {children || ""}
      {title_1 && (
        <h1
          className={`${style.heading2} w-auto items-start px-1 ${
            styles[styleType || 0].twTitleColor_1
          }`}
        >
          {title_1}
        </h1>
      )}
      {title_2 && (
        <h1
          className={`${style.heading2} w-auto items-start px-1 left-2 ${
            styles[styleType || 0].twTitleColor_2
          } `}
        >
          {title_2}
        </h1>
      )}
    </div>
  );
};

Title.default = {
  title_1: "",
  title_2: "",
  styleType: 0
};

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  title_1: PropTypes.string,
  title_2: PropTypes.string,
  styleType: PropTypes.number
};
export default Title;

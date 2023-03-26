import PropTypes from "prop-types";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import style from "../../styles/styles";

const DateSlider = ({
  leftLabel,
  rigthLabel,
  middleLabel,
  handlerLeftClk,
  handlerRigthClk,
}) => {
  return (
    <>
      <div className="w-full">
        <div className="flex flex-between items-center mb-3 border-b-2 border-slate-400">
          <div className="flex basis-1/3 items-center">
            <button
              type="button"
              className="flex justify-center items-center w-8 h-8 m-2 rounded-md ring-1 ring-slate-400 shadow-md shadow-sky-200 hover:bg-blue-100 hover:shadow-green-200"
              onClick={handlerLeftClk}
            >
              <FaAngleLeft />
            </button>
            <p className={`${style.heading0} px-2 select-none`}>{leftLabel}</p>
          </div>
          <div
            className={`flex basis-1/3 ${style.heading0} flex justify-center items-center select-none`}
          >
            {middleLabel}
          </div>
          <div className="flex basis-1/3 justify-end items-center">
            <p
              className={`${style.heading0} px-2 flex justify-end select-none`}
            >
              {rigthLabel}
            </p>
            <button
              type="button"
              className="flex justify-center items-center w-8 h-8 m-2 rounded-md ring-1 ring-slate-400 shadow-md shadow-sky-200 hover:bg-blue-100 hover:shadow-green-200"
              onClick={handlerRigthClk}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

DateSlider.default = {
  leftLabel: "",
  rigthLabel: "",
  middleLabel: "",
};

DateSlider.propTypes = {
  leftLabel: PropTypes.string,
  rigthLabel: PropTypes.string,
  middleLabel: PropTypes.string,
  handlerLeftClk: PropTypes.func,
  handlerRigthClk: PropTypes.func,
};

export default DateSlider;

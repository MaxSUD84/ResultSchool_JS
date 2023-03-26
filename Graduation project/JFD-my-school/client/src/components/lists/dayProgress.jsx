/* eslint-disable multiline-ternary */
/* eslint-disable indent */
import PropTypes from "prop-types";
import style from "../../styles/styles";
import Rating from "../elems/rating";

const DayProgress = ({ dayProgress, progRating }) => {
  // const { dayProgress, progRating } = obj;
  //   const handleClose = () => {
  //     setActive(active);
  //   };

  return (
    <div
      className={`
            w-fit
            min-w-[240px] rounded
        `}
    >
      <ul className="list-none flex flex-col justify-center items-center">
        {dayProgress.map((sub) => (
          <div
            key={sub.id}
            className={`
                    flex flex-row justify-between items-end w-full
                    border-0 border-b-2 border-gray-200 py-0.5
                `}
          >
            <p className={`${style.paragraph} whitespace-nowrap mb-1`}>
              {sub.subject}:
            </p>

            <div className="px-3">
              <Rating value={sub.mark} />
            </div>
          </div>
        ))}
        {/* <div className={`rounded ring-1 ring-red-500`}>X</div> */}
        <div
          className={`
                flex flex-row justify-between items-end 
                w-full
                border-0 border-t-2 border-primary-1
                bg-slate-300 bg-opacity-60
            `}
        >
          <p className={`${style.paragraph} whitespace-nowrap  mb-1`}>
            {"Сред.:"}
          </p>
          <div className="px-3">
            <Rating value={progRating} />
          </div>
        </div>
      </ul>
    </div>
  );
};

DayProgress.propTypes = {
  dayProgress: PropTypes.array,
  progRating: PropTypes.number,
};

export default DayProgress;

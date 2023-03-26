/* eslint-disable indent */
// import { useState } from "react";
import PropTypes from "prop-types";
import Rating from "../elems/rating";

const ProgressDayCard = ({ dayPorgress: d, dayStyle, handleClick }) => {
  return (
    <div>
      <div
        key={d.id}
        className={`
            hidden lg:flex flex-col
            shadow-md hover:shadow-green-300 
            ${
              dayStyle == 2
                ? "shadow-red-300 bg-red-100"
                : "shadow-slate-400  bg-slate-100"
            }
            ring-1 ring-zinc-400                       
            rounded
            w-20 h-20
            my-3
        `}
        onClick={() => handleClick(d.id)}
      >
        <p className="flex justify-end items-start p-2 font-semibold text-2xl text-slate-500">
          {d.day}
        </p>
        <p className="pb-2 px-2 flex justify-between items-end font-normal text-md text-primary-500">
          {"Ср:  "}
          <Rating value={d.progRating} />
        </p>
      </div>
    </div>
  );
};

ProgressDayCard.propTypes = {
  dayPorgress: PropTypes.object,
  dayStyle: PropTypes.number,
  handleClick: PropTypes.func,
};

export default ProgressDayCard;
